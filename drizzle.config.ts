import { defineConfig } from 'drizzle-kit';
import { type Config } from 'drizzle-kit';
import { env } from '@/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: false,
  casing: 'snake_case',
}) satisfies Config;
