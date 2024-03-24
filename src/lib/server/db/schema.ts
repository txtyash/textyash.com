import { sql } from "drizzle-orm";
import { pgTable, smallint, text, varchar } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  slug: varchar("slug", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 64 }).notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  lastEdit: text("last_edit").default(sql`CURRENT_TIMESTAMP`),
  content: text("content").notNull(),
  readTime: smallint("read_time"),
});
