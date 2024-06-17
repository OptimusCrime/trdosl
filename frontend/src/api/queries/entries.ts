import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '../endpoints';
import { BackendEndpoints } from '../endpoints/backendEndpoints.types';
import { queryKeys } from './queryKeys';

export const useEntries = () =>
  useQuery({
    queryKey: queryKeys.entries,
    queryFn: api.getEntries,
    staleTime: Infinity,
  });

export const usePostEntry = () =>
  useMutation({
    mutationFn: (params: BackendEndpoints.Entries.POST.Payload) => api.postEntry(params),
    onSuccess: (data) => {
      return data;
    },
  });

export const useDeleteEntry = () =>
  useMutation({
    mutationFn: (id: number) => api.deleteEntry(id),
    onSuccess: (data) => {
      return data;
    },
  });
