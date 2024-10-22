import { serial, pgTable, timestamp, text, varchar, boolean, integer, smallint } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const posts = pgTable('post', {
	id: serial('id').primaryKey(),
	slug: varchar('slug', { length: 100 }).unique().notNull(),
	title: varchar('title', { length: 100 }).notNull(),
	markdown: text('markdown').notNull(),
	html: text('html').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	readTime: smallint('read_time').notNull(),
	visible: boolean('visible').notNull().default(false),
	restricted: boolean('restricted').notNull().default(false),
});

export const tags = pgTable('tag', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 10 }).unique().notNull(),
	createdAt: timestamp('created_at').defaultNow(),
});

export const postsTags = pgTable('post_tag', {
	postId: integer('post_id').notNull().references(() => posts.id),
	tagId: integer('tag_id').notNull().references(() => tags.id),
});

export const postsRelations = relations(posts, ({ many }) => ({
	postsTags: many(postsTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
	postsTags: many(postsTags),
}));

export const postsTagsRelations = relations(postsTags, ({ one }) => ({
	post: one(posts, {
		fields: [postsTags.postId],
		references: [posts.id],
	}),
	tag: one(tags, {
		fields: [postsTags.tagId],
		references: [tags.id],
	}),
}));