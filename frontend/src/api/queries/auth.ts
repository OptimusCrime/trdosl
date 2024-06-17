import { useMutation } from '@tanstack/react-query';

import { api } from '../endpoints';

export const useAuth = () =>
  useMutation({
    mutationFn: (params: { password: string }) => api.postAuth(params),
    onSuccess: (data) => {
      return data;
    },
  });
