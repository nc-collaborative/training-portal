import Axios from 'axios';
import swal from 'sweetalert2';
import { afterLoad, wait } from '../../utils';

const confirm = swal.mixin({
  reverseButtons: true,
  showConfirmButton: true,
  showCancelButton: true,
});

window.confirmCopy = async function confirmCopy(
  trainingId: number,
  versionId: number,
) {
  const { dismiss } = await confirm({
    titleText: `Make a copy of version #${versionId}?`,
    confirmButtonText: 'Copy',
  });

  if (dismiss) return;

  swal('Making copy…');
  swal.showLoading();

  try {
    const { data } = await Axios.post(
      `/admin/trainings/${trainingId}/versions/${versionId}/copy`,
    );

    window.location.assign(`./versions/${data.id}`);
  } catch (e) {
    swal.hideLoading();
    swal({
      type: 'error',
      titleText: 'Sorry, there was an error.',
      html: `<code>${e.message}</code>`,
    });
    console.error(e);
  }
};

window.confirmPublish = async function confirmPublish(
  trainingId: number,
  versionId: number,
) {
  const { dismiss } = await confirm({
    titleText: `Publish revision #${versionId}?`,
    text: 'All new learners will see this content when taking the training.',
    confirmButtonText: 'Publish',
  });

  if (dismiss) return;

  swal('Publishing...');
  swal.showLoading();

  try {
    await Axios.post(
      `/admin/trainings/${trainingId}/versions/${versionId}/publish`,
    );
    window.location.reload();
  } catch (e) {
    swal.hideLoading();
    swal({
      type: 'error',
      titleText: 'Sorry, there was an error',
      html: `<code>${e.message}</code>`,
    });
    console.error(e);
  }
};

window.confirmUnpublish = async function confirmUnpublish(
  trainingId: number,
  versionId: number,
) {
  const { dismiss } = await confirm({
    titleText: `Unpublish revision #${versionId}?`,
    text:
      'This will revert the training into draft mode until another revision is published.',
    confirmButtonText: 'Unpublish',
  });

  if (dismiss) return;

  swal('Saving...');
  swal.showLoading();

  try {
    await Axios.delete(
      `/admin/trainings/${trainingId}/versions/${versionId}/publish`,
    );
    window.location.reload();
  } catch (e) {
    swal.hideLoading();
    swal({
      type: 'error',
      titleText: 'Sorry, there was an error',
      html: `<code>${e.message}</code>`,
    });
    console.error(e);
  }
};
