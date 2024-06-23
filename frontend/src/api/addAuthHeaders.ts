import { BeforeRequestHook } from 'ky';

import { getCookie } from '../auth';

const DO_NOT_ADD_HEADER_URLS = ['/v1/entries', '/v1/auth'];

export const addAuthHeaders: BeforeRequestHook = async (request) => {
  for (const url of DO_NOT_ADD_HEADER_URLS) {
    if (request.url.endsWith(url)) {
      return;
    }
  }

  request.headers.set('Authorization', `Bearer ${getCookie()}`);
};
