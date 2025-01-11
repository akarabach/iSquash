import {
  bigint,
  boolean,
  foreignKey,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  unique,
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

export const eventTable = pgTable(
  'event',
  {
    id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
    name: text().notNull(),
    public: boolean().notNull().default(false),
    ownerId: uuid()
      .notNull()
      .references(() => userProfileTable.id, { onDelete: 'no action' }),
  },
  t => [
    pgPolicy('only public or owner can read', {
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

export const eventParticipant = pgTable(
  'event_participant',
  {
    id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
    eventId: bigint({ mode: 'number' }).references(() => eventTable.id),
    participantId: uuid().references(
      () => userProfileTable.id
    ),
    joinedAt: timestamp({
      mode: 'string',
      precision: 3,
      withTimezone: true,
    }).defaultNow(),
  },
  t => [
    unique('one_user_per_event')
      .on(t.eventId, t.participantId)
      .nullsNotDistinct(),
    pgPolicy('authenticated can insert', {
      for: 'insert',
      to: authenticatedRole,
      withCheck: eq(t.participantId, authUid),
    }),
  ]
);
