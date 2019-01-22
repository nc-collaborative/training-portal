import '../../../lib/ckeditor/ckeditor';
import { afterLoad } from '../../utils';

import './new-edit.scss';

afterLoad(() => {
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

  isGraded!.addEventListener('change', event => {
    if (isGraded.checked) {
      passContainer.style.removeProperty('display');
      passPct.disabled = false;
      passPct.required = true;
    } else {
      passContainer.style.display = 'none';
      passPct.disabled = true;
      passPct.required = false;
    }
  });
});
