import ky, {HTTPError} from 'ky';

import {deleteCookie} from '../../auth';
import {URLS} from "../../utils/urls";
import {addAuthHeaders} from '../addAuthHeaders';
import {HttpStatus} from '../httpStatus';
import {BackendEndpoints} from './backendEndpoints.types';

// Why did I over-engineer this soo much
interface WhitelistItem {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  regex: RegExp;
}

const WHITELISTED_AUTH_ERROR_ITEMS: WhitelistItem[] = [
  {
    method: 'POST',
    regex: /v1\/auth$/,
  },
];

const api = ky.create({
  prefixUrl: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080',
  hooks: {
    beforeRequest: [addAuthHeaders],
    beforeError: [
      async (error: HTTPError) => {
        if (error.response.status === HttpStatus.Forbidden) {
          for (const item of WHITELISTED_AUTH_ERROR_ITEMS) {
            if (
              error.request.method.toUpperCase() === item.method.toUpperCase() &&
              error.request.url.match(item.regex)
            ) {
              return error;
            }
          }

          deleteCookie();

          // Lol
          window.location.replace(URLS.MAP);
        }

        return error;
      },
    ],
  },
  retry: 0,
});

///////////////////////////////////////////////////////////////////////
// Entries
///////////////////////////////////////////////////////////////////////

export const getEntries = () =>
  api
    .get('v1/entries')
    .json<BackendEndpoints.Entries.GET>()
    .then((res) => res.data);

///////////////////////////////////////////////////////////////////////
// Auth
///////////////////////////////////////////////////////////////////////

export const postAuth = (params: { password: string }) =>
  api
    .post('v1/auth', {
      headers: {
        'x-trdosl-password': params.password,
      },
    })
    .json<BackendEndpoints.Auth.POST>()
    .then((res) => res.data);
