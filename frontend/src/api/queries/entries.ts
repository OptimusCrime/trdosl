import {useQuery} from '@tanstack/react-query';

import { api } from '../endpoints';
import {queryKeys} from "./queryKeys";

export const useEntries = () =>  useQuery({
  queryKey: queryKeys.entries,
  queryFn: api.getEntries,
  staleTime: Infinity,
});
