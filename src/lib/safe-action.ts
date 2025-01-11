import { createServerActionProcedure } from 'zsa';

import { env } from '@/env';
import { assertAuthenticated } from '@/lib/supabase-server';

export class PublicError extends Error {
  code: number;
  constructor(message: string, code?: number) {
    super(message);
    this.code = code!;
  }
}

export class AuthenticationError extends PublicError {
  constructor() {
    super('You must be logged in to view this content');
    this.name = 'AuthenticationError';
  }
}

function shapeErrors({ err }: { err: unknown }) {
  const isAllowedError = err instanceof PublicError;
  const isDev = env.NODE_ENV === 'development';
  if (isAllowedError || isDev) {
    console.error(err);
    const error = err as unknown as PublicError;
    return {
      code: error.code ?? 'ERROR',
      message: `${!isAllowedError && isDev ? 'DEV ONLY ENABLED - ' : ''}${
        error.message
      }`,
    };
  } else {
    return {
      code: 'ERROR',
      message: 'Something went wrong',
    };
  }
}

export const authAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await assertAuthenticated();
    return { user };
  });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {});
