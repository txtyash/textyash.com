import type { Actions, PageServerLoad } from './$types';
import { eq, sql } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { db, posts } from '$lib/server/db';
import slugify from 'slugify';
import { readingTime } from 'reading-time-estimator';
import type { RequestEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }: RequestEvent) => {
	const post = (await db.select().from(posts).where(eq(posts.slug, params.slug)))[0];
	if (!post) {
		error(404);
	}
	return {
		post
	};
};

export const actions = {
	default: async ({ params, request }) => {
		const formData = await request.formData();
		const title = formData.get('title')?.toString().trim() ?? '';
		const content = formData.get('content')?.toString().trim() ?? '';
		const hidden = !!formData.get('hidden');

		// Store data that needs no further processing
		const goodData = { title, content, hidden };

		if (title.length < 12)
			return fail(422, {
				title,
				content,
				hidden,
				error: 'Title should be longer than 12 characters.'
			});

		if (title.length > 64)
			return fail(422, {
				title,
				content,
				hidden,
				error: 'Title should be shorter than 64 characters.'
			});

		if (content.length < 1000)
			return fail(422, {
				title,
				content,
				hidden,
				error: 'Content should have more than 1000 characters.'
			});

		// Create a slug for the title
		const newSlug = slugify(title, {
			lower: true,
			strict: true
		});

		// Check for existing posts with same slugs
		if (params.slug !== newSlug) {
			const [{ exists }] = await db.execute(
				sql`select exists(select 1 from ${posts} where ${posts.slug} = ${newSlug})`
			);
			if (exists)
				return fail(409, {
					title,
					content,
					hidden,
					error: 'A post with a similar title already exits.'
				});
		}

		// calculate read time of the post
		const readTime = readingTime(content, 230).minutes;

		// Update the timestamp for lastEdit field
		const lastEdit = sql`CURRENT_TIMESTAMP`;

		// Update the post
		try {
			await db
				.update(posts)
				.set({
					...goodData,
					slug: newSlug,
					readTime,
					lastEdit
				})
				.where(eq(posts.slug, params.slug));
		} catch (error: any) {
			return fail(401, { ...goodData, error: error.message });
		}

		// Redirect to the newly updated the post
		redirect(303, '/posts/' + newSlug);
	}
} satisfies Actions;
