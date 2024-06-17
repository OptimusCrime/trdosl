/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryKey } from '@tanstack/react-query';

type QueryKeys = {
  [K: string]: QueryKey | QueryKeys | ((...args: any[]) => QueryKey | QueryKeys);
};

// Base keys
const ENTRIES = 'entries' as const;

export const queryKeys = {
  entries: [ENTRIES],
} as const satisfies QueryKeys;
