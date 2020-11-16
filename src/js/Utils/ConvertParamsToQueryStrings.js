export default function ConvertParamsToQueryStrings(params) {
  let qeryStrings = '?';
  for (const [key, value] of Object.entries(params)) {
    qeryStrings += `${key}=${value}&`;
  }
  qeryStrings = qeryStrings.slice(0, -1);
  return qeryStrings;
}
