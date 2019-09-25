/**
 * @module @lib/utils
 */

/**
 * Get value by key from localstorage.
 * Key and value are encrypted in B64.
 */
export const getFromLocalStorage = (key: string): any | null => {

  const raw: string | null = localStorage.getItem(encrypt(key)) || null;

  return raw === null ? null : parse(raw);
};

/**
 * Set value by key from localstorage.
 * Key and value are encrypted in B64.
 */
export const setLocalStorageItem = (key: string, value: any): void => {
  localStorage.setItem(encrypt(key), encrypt(JSON.stringify(value)));
};

/**
 * Remove value by key from local storage.
 * Key and value are encrypted in B64.
 */
export const removeLocalStorageItem = (key: string): void => localStorage.removeItem(encrypt(key));

/**
 * Encrypt function for local storage.
 */
export const encrypt = (value: string): string => btoa(value);

/**
 * Decrypt function for local storage.
 */
export const decrypt = (value: string): string => atob(value);

/**
 * Decrypt function for local storage.
 */
export const parse = (value: string): any => JSON.parse(decrypt(value));
