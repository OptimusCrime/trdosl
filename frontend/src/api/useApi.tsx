import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { queryClientConfig } from './queryClientConfig';

const queryClient = new QueryClient({
  ...queryClientConfig,
});

interface ApiProviderProps {
  children: React.ReactNode;
}

export const ApiProvider = (props: ApiProviderProps) => {
  const { children } = props;
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
