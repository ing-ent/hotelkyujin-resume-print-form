/**
 * Convert String to Number
 * @param value String
 * @param key String
 * return Object
 */
export default function convertStringToNumber(value, key) {
  if (value && value.length > 0) {
    return { [key]: Number(value) };
  }
  return {};
}
