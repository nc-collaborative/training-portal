import axios from 'axios';
import { afterLoad } from '../utils';

declare const swal: typeof import('sweetalert2').default;
declare const Survey: typeof import('survey-jquery');

interface Models {
  Training: import('../../../server/src/models/Training').default;
  TrainingAttempt: import('../../../server/src/models/TrainingAttempt').default;
  TrainingVersion: import('../../../server/src/models/TrainingVersion').default;
}

interface PageWindow extends Window {
  __hhState: {
    training: Models['Training'];
    version: Models['TrainingVersion'];
    quitTraining: () => void;
  };
}

// Load state injected server-side by njk
const { training, version } = (window as PageWindow).__hhState;

let isTakingQuiz = true;

afterLoad(() => {
  const survey = new Survey.Survey(version.content);

  // Assign default completed message
  survey.showCompletedPage = false;
  if (!survey.completedHtml) {
    survey.completedHtml = 'Training is Complete.';
  }

  $('#survey-container').Survey({
    model: survey,
    onComplete,
    onCurrentPageChanged,
  });

  const page = Number(
    new URL(window.location.toString()).searchParams.get('page'),
  );
  if (page) {
    survey.currentPage = page;
  }

  function onCurrentPageChanged() {
    // Update URL query param
    // debugger;
    if (window.history.pushState) {
      const pageNum = survey.currentPage.visibleIndex;
      // window.history.replaceState({ pageNum }, null, '?page=' + pageNum);
      const params = new URLSearchParams(location.search);
      params.set('page', pageNum);

      window.history.pushState(
        { pageNum },
        `${window.location.pathname}?${params}`,
      );
    }
  }

  async function onComplete(sender: Survey.SurveyModel, options) {
    // Put survey into read-only mode
    sender.mode = 'display';

    const { dismiss } = await swal({
      title: 'Finish and submit answers?',
      text:
        'You will not be able to edit your answers later without starting a new attempt.',
      confirmButtonText: 'Submit now',
      confirmButtonColor: 'green',
      showCancelButton: true,
      cancelButtonText: 'Stay and edit answers',
      reverseButtons: true,
    });

    if (dismiss) {
      sender.clear(false); // don't clear data
      survey.mode = 'edit';
      survey.currentPage = survey.currentPage.visibleIndex - 1;
      return;
    }

    swal({
      text: 'Saving your answers...',
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    swal.showLoading();

    try {
      const attempt = (await axios.post(
        `/learner/trainings/${training.id}/versions/${version.id}/attempt`,
        sender.data,
      )).data as Models['TrainingAttempt'];

      await swal({
        type: 'success',
        text: 'Answers saved',
        confirmButtonText: 'View Results',
      });

      isTakingQuiz = false;
      window.location.assign(
        `/trainings/${training.id}/versions/${version.id}/attempts/${
          attempt.id
        }`,
      );
    } catch (e) {
      console.error(e);
      // TODO: handle case where saving failed due to expired login state;
      // open other window to re-login to get new session cookie, then try
      // to submit again
      swal({
        type: 'warning',
        title: 'Unable to save answers',
        text: 'Sorry, we were unable to save your answers at this time.',
      });
    }
  }

  // Support back button
  if (window.history.pushState) {
    window.addEventListener('popstate', event => {
      const popPageNum = event.state.pageNum;
      survey.currentPage = popPageNum;
    });
  }
});

window.__hhState.quitTraining = function quitTraining() {
  swal({
    text: 'Are you sure you want to quit? Your current progress will be lost.',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Quit now',
    confirmButtonColor: 'red',
    cancelButtonText: 'Stay and finish',
    reverseButtons: true,
    focusCancel: true,
  }).then(({ dismiss }) => {
    if (dismiss) return;
    isTakingQuiz = false;
    window.location.assign(`/trainings/${training.id}`);
  });
};

// Warn the user before they leave the page
window.addEventListener('beforeunload', event => {
  if (!isTakingQuiz) return;
  event.preventDefault();
  event.returnValue =
    'You have unsaved progress on this training. Are you sure you want to leave?';
});
