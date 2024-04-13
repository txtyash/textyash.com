import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db, posts } from '$lib/server/db';
import { sql } from 'drizzle-orm';
import slugify from 'slugify';
import { readingTime } from 'reading-time-estimator';
import { decode } from 'base64-arraybuffer';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const title = formData.get('title')?.toString().trim() ?? '';
		const content = formData.get('content')?.toString().trim() ?? '';
		const hidden = !!formData.get('hidden');
		const image = formData.get('image')?.toString(); // image is base64
		const imageExt = formData.get('imageExt')?.toString();
		let imagePath: string | null = null;

		const preservedData = { title, content, hidden };

		if (title.length < 12)
			return fail(422, {
				...preservedData,
				error: 'Title should be longer than 12 characters.'
			});

		if (title.length > 64)
			return fail(422, {
				...preservedData,
				error: 'Title should be shorter than 64 characters.'
			});

		if (content.length < 1000)
			return fail(422, {
				...preservedData,
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
				...preservedData,
				error: 'A post with a similar title already exits.'
			});

		// Upload image
		if (image) {
			const filePath = `${slug}.${imageExt}`;

			const { error } = await supabase.storage
				.from('cover-images')
				.upload(filePath, decode(image), {
					contentType: 'image/*',
					upsert: true
				});
			if (error) {
				return fail(error.statusCode, { ...preservedData, error: error.message });
			}
			imagePath = filePath;
		}

		// calculate read time of the post
		const readTime = readingTime(content, 230).minutes;
		try {
			await db.insert(posts).values({ ...preservedData, slug, readTime, imagePath });
		} catch (error: any) {
			return fail(401, { ...preservedData, error: error.message });
		}
		redirect(303, slug);
	}
} satisfies Actions;
