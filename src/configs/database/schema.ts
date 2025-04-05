import {integer, serial, pgTable, varchar,timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({length: 255}).notNull(),
});

export const postsTable = pgTable("posts", {
  id: serial().primaryKey(),
  userId: integer().notNull().references(() => usersTable.id),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
  tags: varchar({ length: 255 }).notNull(),
  postFor: varchar({ length: 255 }).notNull(),
  visibility: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull(),
});
