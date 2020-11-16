import { animateScroll } from 'react-scroll';
/**
 * Redux-Form onSubmitFail時にValidateエラー項目位置にスクロールさせるCallback function
 */
export const scrollToFirstError = (errors) => {
  const errorArray = [];
  // console.log(errors);
  Object.keys(errors).forEach((innerKey) => {
    if (typeof errors[innerKey] === 'object') {
      Object.keys(errors[innerKey]).forEach((key) => {
        errorArray.push(`${innerKey}.${key}`);
      });
    } else if (typeof errors[innerKey] === 'string') {
      errorArray.push(innerKey);
    }
  });
  const errorFirstName = errorArray[0];
  // console.log(errorArray);
  let selectorStr = `input[name="${errorFirstName}"]`;
  let elem = document.querySelector(selectorStr);
  if (!elem) {
    selectorStr = `select[name="${errorFirstName}"]`;
    elem = document.querySelector(selectorStr);
  }
  if (!elem) {
    selectorStr = `input[name="${errorFirstName}[0]"]`;
    // console.log(selectorStr);
    elem = document.querySelector(selectorStr);
  }
  if (!elem) {
    elem = document.getElementsByName(errorFirstName)[0];
  }
  // console.log(elem);
  const rect = elem.getBoundingClientRect();
  let y;
  if (rect.top === 0) {
    y = 0;
  } else {
    y = rect.top + window.pageYOffset - 50;
  }
  animateScroll.scrollTo(y);
  elem.focus();
  return true;
};

export const scrollToFirstErrorArrayType = (errors) => {
  const errorArray = [];
  // console.log(errors);
  Object.keys(errors.careers).forEach((innerKey) => {
    if (errors.careers[innerKey] !== undefined) {
      errorArray.push(`careers[${innerKey}].company_name`);
    }
  });
  const errorFirstName = errorArray[0];
  // console.log(errorFirstName);
  const selectorStr = `input[name="${errorFirstName}"]`;
  const elem = document.querySelector(selectorStr);
  const rect = elem.getBoundingClientRect();
  let y;
  if (rect.top === 0) {
    y = 0;
  } else {
    y = rect.top + window.pageYOffset - 50;
  }
  animateScroll.scrollTo(y);
  elem.focus();
  return true;
};
