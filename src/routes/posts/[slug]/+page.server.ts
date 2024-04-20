import type { PageServerLoad } from './$types';
import { db, posts } from '$lib/server/db';
import { eq, sql } from 'drizzle-orm';
import { error as svelteError } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const post = await db
		.select({
			title: posts.title,
			content: posts.content,
			hidden: posts.hidden,
			slug: posts.slug,
			createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`,
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
