/**
 * add date Separator
 * @param yyyymmdd String
 * @param key String
 * return String yyyy-mm-dd
 */
export function addDateStringSeparator(yyyymmdd, key, separator='-') {
  return { [key]: `${yyyymmdd.substring(0, 4)}${separator}${yyyymmdd.substring(4, 6)}${separator}${yyyymmdd.substring(6, 8)}` };
}

/**
 * remove Date Separator
 * @param yyyymmdd String
 * @param key String
 * return String
 */
export function removeDateStringSeparator(yyyymmdd, key) {
  return { [key]: yyyymmdd.replace(/-/g, '') };
}
