/**
 * add PostalCode Separator
 * @param postalCode String
 * @param key String
 * return String
 */
export function addPostalCodeSeparator(postalCode, key) {
  const separator = '-';
  return { [key]: `${postalCode.substring(0, 3)}${separator}${postalCode.substring(3, 7)}` };
}

/**
 * Remove PostalCode Separator
 * @param postalCode String
 * @param key String
 * return String
 */
export function removePostalCodeSeparator(postalCode, key) {
  return { [key]: postalCode.replace(/-/g, '') };
}
