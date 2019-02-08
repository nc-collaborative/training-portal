$(document).ready(() => {
  const editor = CKEDITOR.replace('input-description');

  editor.once('instanceReady', ({ editor: { element } }) => {
    element.$.style.visibility = 'visible';
  });
});
