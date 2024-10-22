import type { Actions, PageServerLoad } from './$types';
import { eq, sql } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { db, posts } from '$lib/server/db';
import slugify from 'slugify';
import { readingTime } from 'reading-time-estimator';
import type { RequestEvent } from '@sveltejs/kit';
import { parse } from 'marked';
import { getMarkdownTitle } from '$lib/helper';
import type { UpdatedPost } from '$lib/types';

export const load: PageServerLoad = async ({ params }: RequestEvent) => {
	const post = (await db.select().from(posts).where(eq(posts.slug, params.slug ?? "")))[0];
	if (!post) {
		error(404);
	}
	return {
		post
	};
};

export const actions = {
	default: async ({ params, request }) => {
		const formData: FormData = await request.formData();
		const markdown: string = formData.get('markdown')?.toString().trim() ?? '';
		const visible: boolean = !!formData.get('visible');
		const restricted: boolean = !!formData.get('visible');
		// TODO
		const tags: string[] = [];

		const titleResult = getMarkdownTitle(markdown);

		if (!titleResult.success) return fail(400, { markdown, visible, restricted, tags, error: titleResult.error });

		// Create a slug for the title
		const slug = slugify(titleResult.title, {
			lower: true,
			strict: true
		});

		// Check for existing posts with same slugs
		if (params.slug !== slug) {
			const [{ exists }] = await db.execute(
				sql`select exists(select 1 from ${posts} where ${posts.slug} = ${slug})`
			);
			if (exists)
				return fail(409, {
					markdown,
					visible,
					restricted,
					error: 'A post with a similar title already exits.'
				});
		}

		// Parse markdown to html
		const html = await parse(markdown);

		const post: UpdatedPost = {
			slug, title: titleResult.title, tags, markdown, html, readTime: readingTime(markdown, 230).minutes, visible, restricted, updatedAt: sql`CURRENT_TIMESTAMP`
		};

		// Update the post
		try {
			await db.update(posts).set(post).where(eq(posts.slug, params.slug));
		} catch (error: any) {
			return fail(401, { ...post, error: error.message });
		}

		// Redirect to the newly updated the post
		redirect(303, '/posts/' + slug);
	}
} satisfies Actions;
