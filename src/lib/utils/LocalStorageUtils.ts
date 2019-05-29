export const getFromLocalStorage = (key: string): any | null => {

  const rawStr: string | null = localStorage.getItem(btoa(key)) || null;

  return rawStr === null ? null : JSON.parse(atob(rawStr));
};

export const setLocalStorageItem = (key: string, value: any): void =>
  localStorage.setItem(btoa(key), btoa(JSON.stringify(value)));

export const removeLocalStorageItem = (key: string): void =>
  localStorage.removeItem(btoa(key));
