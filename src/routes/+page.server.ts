import type { PageServerLoad } from './$types';
import { db, posts } from '$lib/server/db';
import { desc, sql, getTableColumns } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const allPosts = await db
		.select({
			...getTableColumns(posts),
			createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`
		})
		.from(posts)
		.orderBy(desc(posts.createdAt));

	if (allPosts.length === 0) {
		return;
	}
	return {
		posts: allPosts
	};
};
