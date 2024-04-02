import type { PageServerLoad } from './$types';
import { db, posts } from '$lib/server/db';
import { sql } from 'drizzle-orm';

export const load: PageServerLoad = () => {
	const allPosts = db
		.select({
			slug: posts.slug,
			title: posts.title,
			content: posts.content,
			readTime: posts.readTime,
			createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`
		})
		.from(posts);

	return {
		posts: allPosts
	};
};
