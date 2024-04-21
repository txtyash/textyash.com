import { serial, pgTable, timestamp, smallint, text, varchar, boolean } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	slug: varchar('slug', { length: 72 }).unique().notNull(),
	title: varchar('title', { length: 72 }).unique().notNull(),
	description: varchar('description', { length: 192 }).notNull(),
	markdown: text('markdown').notNull(),
	html: text('html').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	lastEdit: timestamp('last_edit').defaultNow(),
	readTime: smallint('read_time').notNull(),
	hidden: boolean('hidden').notNull().default(false),
	exclusive: boolean('exclusive').notNull().default(false)
});
