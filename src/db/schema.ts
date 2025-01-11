import {
  bigint,
  boolean,
  foreignKey,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { eq, or, sql } from 'drizzle-orm';
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
    login: varchar({ length: 256 }).default(sql`gen_random_uuid()`),
    createdAt: timestamp({
      mode: 'string',
      precision: 3,
      withTimezone: true,
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
    public: boolean().notNull().default(false),
    ownerId: uuid()
      .notNull()
      .references(() => userProfileTable.id, { onDelete: 'no action' }),
  },
  t => [
    pgPolicy('only public, owner', {
      for: 'select',
      using: or(eq(t.public, true), eq(t.ownerId, authUid)),
    }),
    pgPolicy('owner can insert', {
      for: 'insert',
      to: authenticatedRole,
      withCheck: eq(t.ownerId, authUid),
    }),
    pgPolicy('owner can update', {
      for: 'update',
      to: authenticatedRole,
      using: eq(t.ownerId, authUid),
      withCheck: eq(t.ownerId, authUid),
    }),
  ]
);
