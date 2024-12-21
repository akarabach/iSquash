import {
  bigint,
  foreignKey,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { eq, sql } from 'drizzle-orm';
import {
  authenticatedRole,
  authUid,
  authUsers,
  supabaseAuthAdminRole,
} from 'drizzle-orm/supabase';

export const userProfileTable = pgTable(
  'user_profile',
  {
    id: uuid().primaryKey().notNull(),
    login: varchar('login', { length: 256 }).default(sql`gen_random_uuid()`),
    createdAt: timestamp('created_at', {
      mode: 'string',
      precision: 3,
    }).defaultNow(),
  },
  t => [
    foreignKey({
      name: 'user_profile_id_fk',
      columns: [t.id],
      foreignColumns: [authUsers.id],
    }).onDelete('cascade'),
    pgPolicy('authenticated can view all profiles', {
      for: 'select',
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy('supabase_auth_admin can insert profile', {
      for: 'insert',
      to: supabaseAuthAdminRole,
      withCheck: sql`true`,
    }),
    pgPolicy('owner can update profile', {
      for: 'update',
      to: authenticatedRole,
      using: eq(t.id, authUid),
      withCheck: eq(t.id, authUid),
    }),
  ]
);

export const tournamentTable = pgTable(
  'tournament',
  {
    id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
    name: text().notNull(),
    ownerId: uuid()
      .notNull()
      .default(authUid)
      .references(() => userProfileTable.id, { onDelete: 'no action' }),
  },
  t => [
    pgPolicy('owner can update', {
      for: 'update',
      to: authenticatedRole,
      using: eq(t.ownerId, authUid),
      withCheck: eq(t.ownerId, authUid),
    }),
  ]
);
