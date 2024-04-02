import type { PageServerLoad } from './$types';
import { db, posts } from '$lib/server/db';
import { desc, sql } from 'drizzle-orm';

export const load: PageServerLoad = () => {
	const allPosts = db
		.select({
			slug: posts.slug,
			title: posts.title,
			content: posts.content,
			readTime: posts.readTime,
			createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`
		})
		.from(posts)
		.orderBy(desc(posts.createdAt));

	return {
		posts: allPosts
	};
};
