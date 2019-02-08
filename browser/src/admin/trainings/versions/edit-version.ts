import axios from 'axios';
import { afterLoad } from '../../../utils';

import './edit-version.scss';

declare const Survey: typeof import('survey-knockout');
declare const swal: typeof import('sweetalert2').default;

interface ThisWindow extends Window {
  __hhState: {
    version: import('../../../models/TrainingVersion').default;
    training: import('../../../models/Training').default;
  };
}

const { training, version } = (window as ThisWindow).__hhState;

declare const SurveyEditor: typeof import('surveyjs-editor');

afterLoad(() => {
  const CkEditor_ModalEditor = {
    afterRender(modalEditor, htmlElement) {
      const editor = CKEDITOR.replace(htmlElement, {
        extraAllowedContent: ['iframe[*]', 'video[*]'],
      });
      editor.on('change', function() {
        modalEditor.editingValue = editor.getData();
      });
      editor.setData(modalEditor.editingValue);
      modalEditor.onValueUpdated = function(newValue) {
        editor.setData(newValue);
      };
    },
    destroy(modalEditor, htmlElement) {
      const instance = CKEDITOR.instances[htmlElement.id];
      if (instance) {
        instance.removeAllListeners();
        CKEDITOR.remove(instance);
      }
    },
  };

  SurveyEditor.SurveyPropertyModalEditor.registerCustomWidget(
    'html',
    CkEditor_ModalEditor,
  );

  SurveyEditor.StylesManager.applyTheme('darkblue');
  SurveyEditor.defaultStrings.ed.toolboxGeneralCategory = 'Questions';

  const blacklist = [['selectbase', 'choicesByUrl']];

  for (const [q, p] of blacklist) {
    // Survey.JsonObject.metaData.removeProperty(q, p);
  }

  const editorOptions = {
    showJSONEditorTab: false,
    showPropertyGrid: false,
    useTabsInElementEditor: true,
    questionTypes: [
      'text',
      'html',
      'checkbox',
      'dropdown',
      'boolean',
      'matrix',
      'matrixdropdown',
      'panel',
      'paneldynamic',
      'radiogroup',
      'rating',
    ],
  };

  const answerableTypes = [
    'checkbox',
    'dropdown',
    'radiogroup',
    'boolean',
    'matrix',
  ];

  for (const type of answerableTypes) {
    const definition =
      SurveyEditor.SurveyQuestionEditorDefinition.definition[type];

    if (!definition.tabs) definition.tabs = [];

    definition.tabs.push({
      name: 'correctAnswer',
    });
  }

  const editor = new SurveyEditor.SurveyEditor(null, editorOptions);

  const htmlType = editor.toolbox.getItemByName('html');
  htmlType.title = 'Reading Content';

  editor.toolbox.replaceItem(htmlType);

  editor.toolbox.changeCategories([
    { name: 'html', category: 'Content' },
    { name: 'panel', category: 'Content' },
    { name: 'paneldynamic', category: 'Content' },
  ]);

  editor.toolbox.allowExpandMultipleCategories = true;

  editor.render('survey-builder');
  editor.toolbox.expandAllCategories();

  editor.text = JSON.stringify(version.content);

  // Customize allowed element operations
  editor.onElementAllowOperations.add((sender, options) => {
    options.allowAddToToolbox = false;

    const obj = options.obj;
    if (!obj) return;

    // Don't allow to change question type if it has an answer set
    if (obj.correctAnswer) {
      options.allowChangeType = false;
    } else {
      options.allowChangeType = true;
    }
  });

  editor.saveSurveyFunc = async function(saveNo, callback) {
    // console.log({ saveNo });
    // console.log({ text: editor.text });

    // console.log({ survey: editor.survey });

    const $saveBtn = $('.svd_save_btn');

    $saveBtn.tooltip({ title: 'saving...', trigger: 'manual' }).tooltip('show');

    try {
      await axios.put(
        `/admin/trainings/${training.id}/versions/${version.id}/update`,
        { content: editor.text },
      );
      $saveBtn.tooltip('dispose');
      $saveBtn
        .tooltip({
          title: '✔︎ saved',
          trigger: 'manual',
        })
        .tooltip('show');
      setTimeout(() => $saveBtn.tooltip('dispose'), 2000);
    } catch (e) {
      callback(saveNo, false);
      swal({
        type: 'error',
        text: 'Could not save, please try again later.',
      });
      console.error(e);
    }
  };
});
