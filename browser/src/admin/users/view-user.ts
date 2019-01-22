import Axios from 'axios';
import swal from 'sweetalert2';
import { afterLoad } from '../../utils';

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
    await Axios.post(`/admin/users/${uid}/sendverification`);
    swal({ type: 'success', text: 'Verification email sent' });
  } catch (err) {
    swal({ type: 'error', text: String(err) });
  }
};
