import { FIRST_PAGE, PAGE } from '@/utils/constant';

/**
 * Sets a value in the browser's local storage for a given key.
 *
 * @param {string} key - The key under which to store the value.
 * @param {T} value - The value to be stored.
 * @returns {void}
 */
export const setLocalStorageItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, value);
};

/**
 * Retrieves a value from the browser's local storage for a given key.
 *
 * @param {string} key - The key to look up in local storage.
 * @param {T | null} [defaultValue=null] - The default value to return if the key is not found or if there is an error.
 * @returns {T | null} The retrieved value or the default value if not found or in case of an error.
 */
export const getLocalStorageItem = <T>(
  key: string,
  defaultValue: T | null = null,
): T | null => {
  try {
    const retrievedItem = localStorage.getItem(key);
    return retrievedItem ? JSON.parse(retrievedItem) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

/**
 * Removes a value from the browser's local storage for a given key.
 *
 * @param {string} key - The key to remove from local storage.
 * @returns {void}
 */
export const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 * Adds or updates a query parameter in a URL and returns the updated URL.
 *
 * @param {string} url - The original URL.
 * @param {string} param_key - The name of the query parameter to add or update.
 * @param {string | number} param_value - The value of the query parameter.
 * @returns {string} The updated URL with the new or updated query parameter.
 */
export const addOrUpdateURLParam = (
  url: string,
  param_key: string,
  param_value: string | number,
): string => {
  let updatedURL = new URL(url);
  let params = updatedURL.searchParams;

  params.set(param_key, param_value.toString());
  updatedURL.search = params.toString();

  return updatedURL.toString();
};

/**
 * Adds or updates a query parameter in a URL and also sets the 'PAGE' parameter to 'FIRST_PAGE.'
 *
 * @param {string} url - The original URL.
 * @param {string} param_key - The name of the query parameter to add or update.
 * @param {string | number} param_value - The value of the query parameter.
 * @returns {string} The updated URL with the new or updated query parameter and 'PAGE' set to 'FIRST_PAGE.'
 */
export const addOrUpdateURLParamForFilters = (
  url: string,
  param_key: string,
  param_value: string | number,
): string => {
  let updatedURL = addOrUpdateURLParam(url, param_key, param_value);
  return addOrUpdateURLParam(updatedURL, PAGE, FIRST_PAGE);
};

/**
 * Deletes a query parameter from a URL and returns the updated URL.
 *
 * @param {string} url - The original URL.
 * @param {string} param - The name of the query parameter to delete.
 * @returns {string} The updated URL with the specified query parameter removed.
 */
export const deleteParamFromURL = (url: string, param: string): string => {
  let updatedURL = new URL(url);
  updatedURL.searchParams.delete(param);
  return updatedURL.toString();
};

/**
 * Deletes a query parameter from a URL and also sets the 'PAGE' parameter to 'FIRST_PAGE.'
 *
 * @param {string} url - The original URL.
 * @param {string} param - The name of the query parameter to delete.
 * @returns {string} The updated URL with the specified query parameter removed and 'PAGE' set to 'FIRST_PAGE.'
 */
export const deleteURLParamForFilter = (url: string, param: string): string => {
  let updatedUrl = deleteParamFromURL(url, param);
  return addOrUpdateURLParamForFilters(updatedUrl, PAGE, FIRST_PAGE);
};

/**
 * Converts a URL with query parameters into a new URL format.
 *
 * @param {string} newUrl - The URL containing query parameters to be converted.
 * @param {string} baseUrl - The base URL to which query parameters are appended.
 * @returns {string} The converted URL with query parameters in the specified format.
 */
export const queryParamURL = (newUrl: string, baseUrl: string): string => {
  const parsedUrl = new URL(newUrl);
  const queryParams = parsedUrl.searchParams;

  const urlParams = new URLSearchParams();

  queryParams.forEach((value, key) => {
    urlParams.append(key, value);
  });

  return `${baseUrl}/?${urlParams.toString()}`;
};

/**
 * Splits the current window's pathname to extract verification key.
 *
 * @param {params} keyAt - The index at which to extract the key.
 * @returns {string} KEY - Extracted verification key from url.
 */
export const getKeyFromUrl = (keyAtIndex: number) => {
  const URL = window.location.pathname;
  const URL_PART = URL.split('/');
  const KEY = URL_PART[keyAtIndex];

  return KEY;
};

/**
 * Splits the current window's pathname to extract user ID.
 *
 * @param {params} uidAt - The index at which to extract the user ID.
 * @returns {string} UID - Extracted user ID from url.
 */
export const getUidFromUrl = (uidAtIndex: number) => {
  const URL = window.location.pathname;
  const URL_PART = URL.split('/');
  const UID = URL_PART[uidAtIndex];

  return UID;
};
