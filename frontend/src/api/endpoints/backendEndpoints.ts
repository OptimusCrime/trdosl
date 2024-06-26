import ky, { HTTPError } from 'ky';

import { deleteCookie } from '../../auth';
import { addAuthHeaders } from '../addAuthHeaders';
import { HttpStatus } from '../httpStatus';
import { BackendEndpoints } from './backendEndpoints.types';

interface WhitelistItem {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
}

const WHITELISTED_AUTH_ERROR_ITEMS: WhitelistItem[] = [
  {
    method: 'POST',
    path: '/v1/auth',
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
            if (error.request.method.toUpperCase() === item.method.toUpperCase() && error.request.url === item.path) {
              return error;
            }
          }

          deleteCookie();
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

export const postEntry = (params: BackendEndpoints.Entries.POST.Payload) =>
  api
    .post('v1/entry', {
      json: params,
    })
    .then(() => Promise.resolve());

export const deleteEntry = (id: number) => api.delete(`v1/entry/${id}`, {}).then(() => Promise.resolve());

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
