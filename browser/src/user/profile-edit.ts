declare const swal: typeof import('sweetalert2').default;

$(document).ready(() => {
  $('#input-countyId').select2({
    placeholder: 'select a county',
    allowClear: true,
  });

  const emailInput = $('#input-email');
  const originalEmail = emailInput.val();

  $('form')[0].onsubmit = event => {
    if (emailInput.val() == originalEmail) return;
    event.preventDefault();
    event.stopPropagation();

    swal({
      type: 'warning',
      title: 'Change email address?',
      html: emailChangeMessage(originalEmail, emailInput.val()),
      confirmButtonText: 'Change Email',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then(({ dismiss }) => {
      if (dismiss) return;
      $('form')[0].submit();
    });
  };
});

function emailChangeMessage(oldAddr, newAddr) {
  return `
    <p>old: <code>${oldAddr}</code></p>
    <p>new: <code>${newAddr}</code></p>
    <p>A message will be sent to the new email address for verification.</p>
  `;
}
