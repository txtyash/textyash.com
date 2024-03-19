import { sql } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  // Registration form fields
  displayName: varchar('display_name', { length: 128 }),
  // TODO: Instagram like username: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,64}$/igm.test(username)
  username: varchar('username', { length: 64 }).unique().notNull(),
  email: varchar('email', { length: 254 }).unique().notNull(),
  password: varchar('password', { length: 256 }),
  // TODO: Check drizzle orm github examples for this
  // Account Dashboard fields
  // bio : text("bio"), // limit the size
  // image: blob('image') // limit size
  // birthDate: date('birth_date'),
  // links: ... // links to their other accounts
});
