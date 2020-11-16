export function ConvertCheckBoxOption(data, name) {
  let option = [];
  for (const v of data) {
    if (v.visible) {
      option = [
        ...option,
        {
          label: v.value,
          value: v.key,
          id: name + v.key,
        },
      ];
    }
  }
  // console.log(option);
  return option;
}

export function ConvertSelectBoxOption(data) {
  let option = [];
  for (const v of data) {
    if (v.visible) {
      option = [
        ...option,
        {
          label: v.value,
          value: v.key,
        },
      ];
    }
  }
  // console.log(option);
  return option;
}
