import type { PageServerLoad } from './$types';
import { db, posts } from '$lib/server/db';
import { eq, sql } from 'drizzle-orm';
import { error as svelteError } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const post = await db
		.select({
			title: posts.title,
			html: posts.html,
			slug: posts.slug,
			lastEdit: sql<string>`to_char(last_edit, 'Mon DD, YYYY')`
		})
		.from(posts)
		.where(eq(posts.slug, params.slug));

	if (post.length === 0) {
		svelteError(404);
	}

	return {
		post: post[0]
	};
};
