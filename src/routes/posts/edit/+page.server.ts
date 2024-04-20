import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db, posts } from '$lib/server/db';
import { sql } from 'drizzle-orm';
import slugify from 'slugify';
import { readingTime } from 'reading-time-estimator';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title')?.toString().trim() ?? '';
		const content = formData.get('content')?.toString().trim() ?? '';
		const hidden = !!formData.get('hidden');

		// Fields that don't need further processing
		const goodData = { title, content, hidden };

		// content length constraints
		if (title.length < 12)
			return fail(422, {
				...goodData,
				error: 'Title should be longer than 12 characters.'
			});

		if (title.length > 64)
			return fail(422, {
				...goodData,
				error: 'Title should be shorter than 64 characters.'
			});

		if (content.length < 1000)
			return fail(422, {
				...goodData,
				error: 'Content should have more than 1000 characters.'
			});

		// Create a slug for the title
		const slug = slugify(title, {
			lower: true,
			strict: true
		});

		// Check for existing posts with same slugs
		const [{ exists }] = await db.execute(
			sql`select exists(select 1 from ${posts} where ${posts.slug} = ${slug})`
		);
		if (exists)
			return fail(409, {
				...goodData,
				error: 'A post with a similar title already exits.'
			});

		// calculate read time of the post
		const readTime = readingTime(content, 230).minutes;

		// Upload post to the database
		try {
			await db.insert(posts).values({ ...goodData, slug, readTime });
		} catch (error: any) {
			return fail(401, { ...goodData, error: error.message });
		}

		// Redirect to the newly created post
		redirect(303, slug);
	}
} satisfies Actions;
