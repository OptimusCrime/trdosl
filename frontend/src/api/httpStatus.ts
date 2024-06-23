export const HttpStatus = {
  Forbidden: 403,
} as const;

export type HttpStatus = keyof typeof HttpStatus;
