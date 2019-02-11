declare const Survey: typeof import('survey-jquery').SurveyWindow;

declare const __hhState: {
  attempt: any;
  training: any;
  version: any;
};

const { version, attempt, training } = __hhState;

$(document).ready(() => {
  const survey = new Survey.Model(version.content);

  survey.mode = 'display';
  survey.data = attempt.answer;
  survey.isSinglePage = true; // show whole thing in one scrollable page
  survey.showNavigationButtons = false;
  survey.showProgressBar = '';

  if (training.isGraded) {
    survey.onAfterRenderQuestion.add(afterRenderQuestion);
  }

  $('#survey').Survey({ model: survey });
});

function afterRenderQuestion(survey, { question, htmlElement }) {
  if (!question.correctAnswer) return;

  const type = question.getType();

  if (type == 'checkbox') markCheckbox(question, htmlElement);
  if (type == 'dropdown') markDropdown(question, htmlElement);
  if (type == 'matrix') markMatrix(question, htmlElement);
  if (type == 'radiogroup') markRadiogroup(question, htmlElement);
}

function markCheckbox(question, htmlElement) {
  htmlElement.classList.add('multi-select');

  for (let i = 0; i < question.choices.length; i++) {
    const value = question.choices[i].itemValue;
    const elem = htmlElement.querySelector(
      `fieldset > div:nth-of-type(${i + 1})`,
    );
    if (question.correctAnswer.includes(value)) {
      elem.classList.add('correct');
    } else {
      elem.classList.add('incorrect');
    }
  }
}

function markDropdown(question, htmlElement) {
  htmlElement.classList.add('dropdown');
  const { correctAnswer, value } = question;

  if (correctAnswer == value) {
    htmlElement.classList.add('correct');
  } else {
    htmlElement.classList.add('incorrect');
  }
}

function markMatrix(question, htmlElement) {
  htmlElement.classList.add('matrix');
  const { correctAnswer, value, rows, columns } = question;

  const tbody = htmlElement.querySelector('tbody');

  for (let i = 0; i < rows.length; i++) {
    const rv = rows[i].itemValue;
    for (let j = 0; j < columns.length; j++) {
      const cv = columns[j].itemValue;
      const cell = tbody.querySelector(
        `tr:nth-of-type(${i + 1}) td:nth-of-type(${j + 2})`, // +2 b/c 1 column offset in presentation
      );

      if (value[rv] == cv) {
        if (cv == correctAnswer[rv]) {
          cell.classList.add('correct');
        } else {
          cell.classList.add('incorrect');
        }
      }
    }
  }
}

function markRadiogroup(question, htmlElement) {
  htmlElement.classList.add('radiogroup');
  if (question.correctAnswer == question.value) {
    htmlElement.classList.add('correct');
  } else {
    htmlElement.classList.add('incorrect');
  }
}
