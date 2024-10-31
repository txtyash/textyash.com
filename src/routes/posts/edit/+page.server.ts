import type { Actions } from './$types';
import { fail, isRedirect, redirect } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { readingTime } from 'reading-time-estimator';
import { parse } from 'marked';
import { getMarkdownTitle } from '$lib/helper';
import { db, posts, postsTags } from '$lib/server/db';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = {
			markdown: formData.get('markdown')?.toString().trim() ?? '',
			visible: !!formData.get('visible'),
			restricted: !!formData.get('restricted'),
			tags: JSON.parse(formData.get('tags')?.toString() ?? '[]') as number[]
		};

		// Validate markdown content
		const titleResult = getMarkdownTitle(data.markdown);
		if (!titleResult.success)
			return fail(400, {
				...data,
				tags: JSON.stringify(data.tags),
				error: titleResult.error
			});


		// Generate slug
		const slug = slugify(titleResult.title, { lower: true, strict: true });

		// Check for existing posts with same slugs
		const [{ exists }] = await db.execute(
			sql`select exists(select 1 from ${posts} where ${posts.slug} = ${slug})`
		);

		if (exists)
			return fail(409, {
				...data,
				tags: JSON.stringify(data.tags),
				error: 'A post with a similar title already exists.'
			});

		try {
			// Parse markdown and calculate read time
			const html = await parse(data.markdown);
			const readTime = Math.ceil(readingTime(data.markdown, 230).minutes);

			// Use a transaction to ensure data consistency
			const result = await db.transaction(async (tx) => {
				// Insert post
				const [newPost] = await tx
					.insert(posts)
					.values({
						slug,
						title: titleResult.title,
						markdown: data.markdown,
						html,
						readTime,
						visible: data.visible,
						restricted: data.restricted
					})
					.returning({ id: posts.id });

				if (!newPost?.id) throw new Error('Failed to create post');

				// Insert tag relations if there are any tags
				if (data.tags.length > 0) {
					await tx
						.insert(postsTags)
						.values(
							data.tags.map(tagId => ({
								postId: newPost.id,
								tagId
							}))
						);
				}

				return { slug };
			});
			
			throw redirect(303, `/posts/${result.slug}`);
		} catch (error) {
			if (isRedirect(error)) throw error;
			console.error('Failed to create post:', error);
			return fail(500, {
				...data,
				tags: JSON.stringify(data.tags),
				error: 'Failed to create post. Please try again.'
			});
		}
	}
} satisfies Actions;

/* OLD CODE
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
*/