export enum LocalStorageKeys {
  HIDE_FACE = 'HIDE_FACE',
}

export const setItem = (key: LocalStorageKeys, value: string) => {
  if (localStorage) {
    localStorage.setItem(key, value);
  }
};

export const getItem = (key: LocalStorageKeys, defaultValue: string): string => {
  if (!localStorage) {
    return defaultValue;
  }

  return localStorage.getItem(key) ?? defaultValue;
};
