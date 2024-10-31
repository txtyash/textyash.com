import type { Actions, PageServerLoad } from './$types';
import { eq, sql } from 'drizzle-orm';
import { fail, isRedirect, redirect } from '@sveltejs/kit';
import { db, posts, postsTags } from '$lib/server/db';
import slugify from 'slugify';
import { readingTime } from 'reading-time-estimator';
import { parse } from 'marked';
import { getMarkdownTitle } from '$lib/helper';

export const load: PageServerLoad = async ({ params }) => {
	try {
		// Use select method to fetch the post and its tags
		const postResult = await db
			.select({
				id: posts.id,
				slug: posts.slug,
				markdown: posts.markdown,
				visible: posts.visible,
				restricted: posts.restricted,
				tags: sql<string>`concat('[', string_agg(${postsTags.tagId}::text, ','), ']')`
			})
			.from(posts)
			.leftJoin(postsTags, eq(posts.id, postsTags.postId))
			.where(eq(posts.slug, params.slug))
			.groupBy(posts.id);

		// If no post found, return null
		if (postResult.length === 0) throw fail(404, { error: 'Error loading post' });
		return { post: postResult[0] };
	} catch (error: any) {
		console.error('Error loading post:', error);
		return fail(404, { error });
	}
};

export const actions = {
	default: async ({ request, params }) => {
		const formData: FormData = await request.formData();
		const markdown: string = formData.get('markdown')?.toString().trim() ?? '';
		const visible: boolean = !!formData.get('visible');
		const restricted: boolean = !!formData.get('restricted');
		const stringTags: string = formData.get('tags')?.toString() ?? "[]";
		const tags: number[] = JSON.parse(stringTags) ?? [];

		// Get the title from markdown
		const titleResult = getMarkdownTitle(markdown);

		if (!titleResult.success) {
			return fail(400, {
				markdown,
				visible,
				restricted,
				tags: stringTags,
				error: titleResult.error
			});
		}

		// Create a slug for the title
		const slug = slugify(titleResult.title, {
			lower: true,
			strict: true
		});

		// Check if the new slug conflicts with any other post (excluding the current post)
		const [{ exists }] = await db.execute(
			sql`select exists(
                select 1 from ${posts} 
                where ${posts.slug} = ${slug} 
                and ${posts.slug} != ${params.slug}
            )`
		);

		if (exists) {
			return fail(409, {
				markdown,
				visible,
				restricted,
				tags: stringTags,
				error: 'A post with a similar title already exists.'
			});
		}

		// Parse markdown to html
		const html = await parse(markdown);

		// Calculate read time
		const readTime = readingTime(markdown, 230).minutes;

		try {
			// Start a transaction
			await db.transaction(async (tx) => {
				// Get the post ID for the tag relations
				const [post] = await tx
					.select({ id: posts.id })
					.from(posts)
					.where(eq(posts.slug, params.slug));

				// Update the post
				await tx
					.update(posts)
					.set({
						slug,
						title: titleResult.title,
						markdown,
						html,
						readTime,
						visible,
						restricted,
						updatedAt: new Date()
					})
					.where(eq(posts.slug, params.slug));

				if (!post) throw new Error(`Post ${post} with slug: ${params.slug} not found`);

				// Delete existing tag relations
				await tx
					.delete(postsTags)
					.where(eq(postsTags.postId, post.id));

				// Insert new tag relations
				if (tags.length > 0) {
					await tx.insert(postsTags)
						.values(
							tags.map(tagId => ({
								postId: post.id,
								tagId
							}))
						);
				}
			});

			// Redirect to the updated post (using new slug if it changed)
			throw redirect(303, `/posts/${slug}`);
		} catch (error: any) {
			if (isRedirect(error)) throw error;
			console.log(error);
			return fail(401, {
				markdown,
				visible,
				restricted,
				tags: stringTags,
				error: error.message
			});
		}
	}
} satisfies Actions;


/* OLD CODE
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
*/
