/**
 * @module @lib/utils
 */

/**
 * Get value by key from localstorage.
 * Key and value are encrypted in B64.
 */
export const getFromLocalStorage = (key: string): any | null => {

  const rawStr: string | null = localStorage.getItem(btoa(key)) || null;

  return rawStr === null ? null : JSON.parse(atob(rawStr));
};

/**
 * Set value by key from localstorage.
 * Key and value are encrypted in B64.
 */
export const setLocalStorageItem = (key: string, value: any): void => localStorage.setItem(btoa(key), btoa(JSON.stringify(value)));

/**
 * Remove value by key from local storage.
 * Key and value are encrypted in B64.
 */
export const removeLocalStorageItem = (key: string): void => localStorage.removeItem(btoa(key));
