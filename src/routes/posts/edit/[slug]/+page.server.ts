import type { Actions, PageLoad } from './$types';
import { eq, sql } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { db, posts } from '$lib/server/db';
import slugify from 'slugify';
import { readingTime } from 'reading-time-estimator';
import type { RequestEvent } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }: RequestEvent) => {
	const post = await db.select().from(posts).where(eq(posts.slug, params.slug));
	if (post.length === 0) {
		error(404);
	}
	return {
		post: post[0]
	};
};

export const actions = {
	default: async ({ params, request }) => {
		const formData = await request.formData();
		let title = formData.get('title')?.toString().trim() ?? '';
		let content = formData.get('content')?.toString().trim() ?? '';

		// If no changes have been made then simply redirect
		const post = (await db.select().from(posts).where(eq(posts.slug, params.slug)))[0];

		if (post?.title === title && post?.content === content) {
			redirect(303, '/posts/' + post?.slug);
		}

		if (title.length < 12)
			return fail(422, {
				title,
				content,
				error: 'Title should be longer than 12 characters.'
			});

		if (title.length > 64)
			return fail(422, {
				title,
				content,
				error: 'Title should be shorter than 64 characters.'
			});

		if (content.length < 1000)
			return fail(422, {
				title,
				content,
				error: 'Content should have more than 100 characters.'
			});

		// Create a slug for the title
		let newSlug = slugify(title, {
			lower: true,
			strict: true
		});

		// calculate read time of the post
		const readTime = readingTime(content, 230).minutes;
		const oldSlug = params.slug;
		const lastEdit = sql`CURRENT_TIMESTAMP`;
		try {
			await db
				.update(posts)
				.set({
					slug: newSlug,
					title,
					content,
					readTime,
					lastEdit
				})
				.where(eq(posts.slug, oldSlug));
		} catch (error: any) {
			return fail(401, { title, content, error: error.message });
		}
		redirect(303, '/posts/' + newSlug);
	}
} satisfies Actions;
