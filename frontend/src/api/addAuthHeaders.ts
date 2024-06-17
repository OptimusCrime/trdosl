import { BeforeRequestHook } from 'ky';

import { getCookie } from '../auth';

const DO_NOT_ADD_HEADER_URLS = ['/v1/entries'];

export const addAuthHeaders: BeforeRequestHook = async (request) => {
  for (const url of DO_NOT_ADD_HEADER_URLS) {
    if (typeof url === 'string') {
      if (request.url.endsWith(url)) {
        return;
      }

      continue;
    }

    if (request.url.match(url)) {
      return;
    }
  }

  request.headers.set('Authorization', `Bearer ${getCookie()}`);
};
