import { conformsTo } from "lodash";

// @flow
export function view(value: Any): String {
  if (value) {
    return value;
  }
  return '';
}

export function radioLabel(field: String, value: String, labels: Array): String {
  let label;
  const option = labels.formOptions[field];
  if (option) {
    for (const o in option) {
      if (option[o].value === value) {
        label = option[o].label;
        break;
      }
    }
  }
  return label;
}

export function checkboxLabel(field: String, values: String, labels: Array): String {
  let label = '';
  const option = labels.formOptions[field];
  if (option) {
    for (const o in option) { // eslint-disable-line
      for (const v in values) {
        if (option[o].value === values[v]) {
          if (label.length > 0) {
            label = `${label} ${option[o].label}`;
          } else {
            label = option[o].label;
          }
        }
      }
    }
  }
  return label;
}

export function selectLabel(field: String, value, labels: Array): String {
  let label;
  if (value === undefined || Number(value) == 0) {
    return '';
  }
  const option = labels.formOptions[field];
  if (option) {
    for (const o in option) {
      if (option[o].value === value) {
        label = option[o].label;
        break;
      }
    }
  }
  return label;
}
