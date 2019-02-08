import axios from 'axios';
declare const swal: typeof import('sweetalert2').default;

window.reverify = async function reverify(uid: number) {
  const { dismiss } = await swal({
    text: 'Re-send verification email now?',
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: 'Send',
    cancelButtonText: 'Cancel',
  });

  if (dismiss) return;

  try {
    await axios.post(`/admin/users/${uid}/sendverification`);
    swal({ type: 'success', text: 'Verification email sent' });
  } catch (err) {
    swal({ type: 'error', text: String(err) });
  }
};
