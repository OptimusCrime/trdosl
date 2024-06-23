import { useMutation, useQuery } from '@tanstack/react-query';

import { getCookie } from '../../auth';
import { api } from '../endpoints';
import { queryKeys } from './queryKeys';

export const useAuth = () =>
  useQuery({
    queryKey: queryKeys.auth,
    queryFn: () => getCookie() !== '',
    staleTime: Infinity,
  });

export const usePostAuth = () =>
  useMutation({
    mutationFn: (params: { password: string }) => api.postAuth(params),
    onSuccess: (data) => {
      return data;
    },
  });
