export function view(value) {
  if (value) {
    return value;
  }
  return '';
}

export function radioLabel(field, value, labels) {
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

export function checkboxLabel(field, values, labels) {
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

export function selectLabel(field, value, labels) {
  let label;
  console.log(field, value);
  if (value === undefined || Number(value) == 0) {
    return '';
  }
  const option = labels.formOptions[field];
  if (option) {
    for (const o in option) {
      if (option[o].value === String(value)) {
        label = option[o].label;
        break;
      }
    }
  }
  console.log(label);
  return label;
}
