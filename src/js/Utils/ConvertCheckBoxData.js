/**
 * APIへポスト用に整形
 * @param labels Object
 * @param value Array
 * @param name String
 * return Object
 */
export function convertCheckBoxPostData(labels, value, name) {
  const data = {};
  if (value && value.length > 0) {
    const mLabels = labels.map((label) => label.key).filter((i) => (value.indexOf(i) < 0));
    value.forEach((v) => Object.assign(data, { [`${name}${v}`]: 1 }));
    mLabels.forEach((v) => Object.assign(data, { [`${name}${v}`]: 0 }));
  }
  return data;
}

/**
 * フォームデータ用に整形
 * @param value Array
 * @param name String
 * return Object
 */
export function convertCheckBoxFormData(value, name) {
  const data = [];
  for (const [k, v] of Object.entries(value)) {
    if (k.indexOf(name) !== -1 && v === 1) {
      data.push(k.slice(-1));
    }
  }
  if (data.length > 0) {
    return { [name]: data };
  }
  return {};
}
