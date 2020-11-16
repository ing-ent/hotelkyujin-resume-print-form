export default function ConvertLabel(data) {
  const label = {};
  for (const v of data) {
    if (v.visible) {
      label[v.key] = v.value;
    }
  }
  return label;
}
