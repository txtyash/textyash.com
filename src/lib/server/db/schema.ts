import { sql } from "drizzle-orm";
import { date, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  // Default fields
  id: serial("id").primaryKey(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  role: text("role", { enum: ["admin", "user", "banned"] })
    .default("user")
    .notNull(),
  // Registration form fields
  displayName: varchar("display_name", { length: 64 }).notNull(),
  // TODO: Instagram like username: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,64}$/igm.test(username)
  username: varchar("username", { length: 64 }).unique().notNull(),
  email: varchar("email", { length: 254 }).unique().notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  // Account Dashboard fields
  bio: varchar("bio", { length: 256 }),
  birthDate: date("birth_date"),
  // TODO: Check drizzle orm github examples for this
  // image: blob('image') // limit size
  // links: ... // links to their other accounts
});
