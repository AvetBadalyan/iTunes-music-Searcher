/**
 * Truncate a string to a maximum length, appending an ellipsis when clipped.
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length before truncating
 * @param {string} [fallback=''] - Value returned when str is empty/nullish
 * @returns {string}
 */
export function truncate(str, maxLength, fallback = '') {
  if (!str) return fallback;
  return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;
}
