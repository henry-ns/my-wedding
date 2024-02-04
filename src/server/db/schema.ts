import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  passwordHash: text("password_hash"),
  image: text("image"),
});

export const presences = sqliteTable("presence", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  check: integer("check", { mode: "boolean" }).notNull().default(false),
  checkedAt: integer("checked_at", { mode: "timestamp_ms" }).notNull(),
});

export const payments = sqliteTable("payment", {
  id: text("id").notNull().primaryKey(),
  unitTotal: integer("unit_total").notNull(),
  payerId: text("user_id").notNull(),
});

export const paymentsRelations = relations(payments, ({ one, many }) => ({
  gifts: many(gifts),
  payer: one(users, {
    fields: [payments.payerId],
    references: [users.id],
  }),
}));

export const gifts = sqliteTable("gift", {
  id: text("id").notNull().primaryKey(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(),
  imageUrl: text("image").notNull(),
  buyerId: text("user_id").notNull(),
  paymentId: text("payment_id").notNull(),
});

export const giftsRelations = relations(gifts, ({ one }) => ({
  payment: one(payments, {
    fields: [gifts.paymentId],
    references: [payments.id],
  }),
  buyer: one(users, {
    fields: [gifts.buyerId],
    references: [users.id],
  }),
}));

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
