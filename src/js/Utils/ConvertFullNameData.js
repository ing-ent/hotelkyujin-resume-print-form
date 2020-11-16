/**
 * split full name to  first name and last name
 * @param fullName String
 * @param key1 Array
 * @param key2 Array
 * return Object
 */
export function splitFullName(fullName, key1, key2) {
  const data = fullName.replace('　', ' ').split(' ');
  return { [key1]: data[0], [key2]: data.slice(1).join(' ') };
}

/**
 * join first name and last name
 * @param lName String,
 * @param fName String,
 * @param key String,
 * return Object
 */
export function joinFullName(lName, fName, key) {
  return { [key]: `${lName} ${fName}` };
}
