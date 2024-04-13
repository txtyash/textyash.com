import type { Actions, PageServerLoad } from './$types';
import { eq, sql } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { db, posts } from '$lib/server/db';
import slugify from 'slugify';
import { readingTime } from 'reading-time-estimator';
import type { RequestEvent } from '@sveltejs/kit';
import { decode } from 'base64-arraybuffer';

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
	default: async ({ params, request, locals: { supabase } }) => {
		const formData = await request.formData();
		const title = formData.get('title')?.toString().trim() ?? '';
		const content = formData.get('content')?.toString().trim() ?? '';
		const hidden = !!formData.get('hidden');
		const image = formData.get('image')?.toString(); // image is base64
		const imageExt = formData.get('imageExt')?.toString();
		let imagePath: string | null = null;

		const preservedData = { title, content, hidden };

		const oldImagePath = (
			await db
				.select({
					imagePath: posts.imagePath
				})
				.from(posts)
				.where(eq(posts.slug, params.slug))
		)[0].imagePath;

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

		// Delete old image
		await supabase.storage.from('cover-images').remove([oldImagePath ?? '']);

		// Upload new image
		if (image) {
			const filePath = `${newSlug}.${imageExt}`;

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
		const oldSlug = params.slug;
		const lastEdit = sql`CURRENT_TIMESTAMP`;
		try {
			await db
				.update(posts)
				.set({
					slug: newSlug,
					title,
					hidden,
					content,
					imagePath,
					readTime,
					lastEdit
				})
				.where(eq(posts.slug, oldSlug));
		} catch (error) {
			return fail(401, { title, content, hidden, error: error.message });
		}
		redirect(303, '/posts/' + newSlug);
	}
} satisfies Actions;
