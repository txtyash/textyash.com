import type { Actions } from './$types';
import { fail, redirect, error as svelteError } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import slugify from 'slugify';
import { readingTime } from 'reading-time-estimator';
import type { NewPost } from '$lib/types';
import { parse } from 'marked';
import { getMarkdownTitle } from '$lib/helper';
import { db, posts, postsTags, tags } from '$lib/server/db';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	try {
		const allTags = await db
			.select({
				value: tags.id,
				label: tags.name,
			})
			.from(tags)
			.leftJoin(postsTags, sql`${tags.id} = ${postsTags.tagId}`)
			.groupBy(tags.id)
			.orderBy(tags.name);

		return { allTags };
	} catch (error: any) {
		return svelteError(404, error.message);
	}
};

export const actions = {
	default: async ({ request }) => {
		const formData: FormData = await request.formData();
		const markdown: string = formData.get('markdown')?.toString().trim() ?? '';
		const visible: boolean = !!formData.get('visible');
		const restricted: boolean = !!formData.get('restricted');
		const stringTags: string = formData.get('tags')?.toString() ?? "[]";
		const tags: number[] = JSON.parse(stringTags) ?? [];

		const titleResult = getMarkdownTitle(markdown);

		if (!titleResult.success) return fail(400, { markdown, visible, restricted, tags: stringTags, error: titleResult.error });

		// Create a slug for the title
		const slug = slugify(titleResult.title, {
			lower: true,
			strict: true
		});

		// Check for existing posts with same slugs
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

		// Parse markdown to html
		const html = await parse(markdown);

		// calculate read time of the post
		const readTime = readingTime(markdown, 230).minutes;

		const post: NewPost = {
			slug, title: titleResult.title, tags, markdown, html, readTime, visible, restricted
		};

		// Upload post to the database
		try {
			const postId = (await db.insert(posts).values(post).returning({ id: posts.id }))[0]?.id;

			// Insert tags into the postsTags table
			for (const tagId of tags) {
				await db.insert(postsTags).values({ postId, tagId });
			}
		} catch (error: any) {
			return fail(401, { ...post, tags: stringTags, error: error.message });
		}

		// Redirect to the newly created post
		redirect(303, slug);
	}
} satisfies Actions;
