import './new-edit.scss';

$(document).ready(() => {
  $('.select2').select2();

  const editor = CKEDITOR.replace('input-longDescription');

  editor.once('instanceReady', ({ editor: { element } }) => {
    element.$.style.visibility = 'visible';
  });

  const isGraded = document.querySelector(
    'input[name=isGraded]',
  ) as HTMLInputElement;
  const passPct = document.querySelector(
    'input[name=passPercent]',
  ) as HTMLInputElement;

  const passContainer = passPct.closest('.form-group') as HTMLElement;

  function toggleShowPassPctInput() {
    if (isGraded.checked) {
      passContainer.style.removeProperty('display');
      passPct.disabled = false;
      passPct.required = true;
    } else {
      passContainer.style.display = 'none';
      passPct.disabled = true;
      passPct.required = false;
    }
  }

  isGraded!.addEventListener('change', toggleShowPassPctInput);
  toggleShowPassPctInput();
});
