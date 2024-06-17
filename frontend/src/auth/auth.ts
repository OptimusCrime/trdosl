const COOKIE_NAME = 'auto_squash_token';
const COOKIE_LIFETIME_DAYS = 90;
const COOKIE_PREFIX = `${COOKIE_NAME}=`;

export const setCookie = (value: string): void => setOrDeleteCookie(value, 'set');
export const deleteCookie = (): void => setOrDeleteCookie(null, 'delete');

export const getCookie = (): string => {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());

  for (const cookie of cookies) {
    if (!cookie.startsWith(COOKIE_PREFIX)) {
      continue;
    }

    const split = cookie.split(COOKIE_PREFIX);
    if (split.length === 2) {
      return split[1];
    }
  }

  return '';
};

const setOrDeleteCookie = (value: string | null, operation: 'set' | 'delete'): void => {
  const date = new Date();
  date.setDate(date.getDate() + COOKIE_LIFETIME_DAYS * (operation === 'set' ? 1 : -1));

  document.cookie = `${COOKIE_NAME}=${value ?? ''}; expires=${date.toUTCString()}`;
};
