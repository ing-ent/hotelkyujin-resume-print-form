export default function getAddressLabelKey(label, pref) {
  let addressKey;
  for (const v of label) {
    if (v.value.startsWith(pref)) {
      addressKey = v.key;
      break;
    }
  }
  return addressKey;
}
