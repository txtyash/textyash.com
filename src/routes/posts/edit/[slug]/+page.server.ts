import type { Actions, PageServerLoad } from './$types';
import { eq, sql } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { db, posts } from '$lib/server/db';
import slugify from 'slugify';
import { readingTime } from 'reading-time-estimator';
import type { RequestEvent } from '@sveltejs/kit';
import { client } from '$lib/client/supabaseClient';

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
		const description = formData.get('description')?.toString().trim() ?? '';
		const markdown = formData.get('markdown')?.toString().trim() ?? '';
		const hidden = !!formData.get('hidden');

		// Store data that needs no further processing
		const goodData = { title, description, markdown, hidden };

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
					markdown,
					hidden,
					error: 'A post with a similar title already exits.'
				});
		}

		// calculate read time of the post
		const readTime = readingTime(markdown, 230).minutes;

		// Update the timestamp for lastEdit field
		const lastEdit = sql`CURRENT_TIMESTAMP`;

		// Rename Cover Image if it exists
		await client.storage.from('cover-images').move(`${params.slug}.jpeg`, `${newSlug}.jpeg`);

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
