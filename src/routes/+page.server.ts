import type { PageServerLoad } from './$types';
import { db, posts } from '$lib/server/db';
import { desc, lt, max, sql } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const latestPostID = (await db.select({ count: max(posts.id) }).from(posts))[0].count;

	const chunk = await db
		.select({
			id: posts.id,
			slug: posts.slug,
			title: posts.title,
			content: posts.content,
			readTime: posts.readTime,
			createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`
		})
		.from(posts)
		.where(lt(posts.id, (latestPostID ?? 0) + 1))
		.orderBy(desc(posts.id))
		.limit(6);

	return {
		chunk
	};
};
