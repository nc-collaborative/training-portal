import { afterLoad } from '../../utils';

declare const Survey: typeof import('survey-jquery');

interface Models {
  Training: import('../../../server/src/models/Training').default;
  TrainingAttempt: import('../../../server/src/models/TrainingAttempt').default;
  TrainingVersion: import('../../../server/src/models/TrainingVersion').default;
}

declare global {
  interface JQuery {
    Survey: (obj: object) => JQuery;
  }
}

declare var $: JQueryStatic;

interface PageWindow extends Window {
  __hhState: {
    attempt: Models['TrainingAttempt'];
    version: Models['TrainingVersion'];
  };
}

// Load state injected server-side by njk
const { attempt, version } = (window as PageWindow).__hhState;

afterLoad(() => {
  const survey = new Survey.Survey(version.content);
  survey.data = attempt.answer;
  survey.mode = 'display';

  // Assign default completed message
  survey.showCompletedPage = false;
  if (!survey.completedHtml) {
    survey.completedHtml = 'Training is Complete.';
  }

  $('#survey-container').Survey({ model: survey });
});
