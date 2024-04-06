import type { PageServerLoad } from './$types';
import { db, posts } from '$lib/server/db';
import { max } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const latestPostID = (await db.select({ count: max(posts.id) }).from(posts))[0].count;

	return {
		latestPostID
	};
};
