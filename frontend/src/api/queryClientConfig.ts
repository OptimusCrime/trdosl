import { QueryClientConfig } from '@tanstack/react-query';
import { HTTPError } from 'ky';

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        return error instanceof HTTPError && error.response.status >= 500 && failureCount < 3;
      },
    },
  },
};
