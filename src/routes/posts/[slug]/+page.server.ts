import type { PageServerLoad } from './$types';
import { isRedirect } from '@sveltejs/kit';
import { db, posts, tags, postsTags } from '$lib/server/db';
import { eq, sql } from 'drizzle-orm';
import { fail, redirect, error as svelteError } from '@sveltejs/kit';
import { ADMIN_EMAIL } from '$env/static/private';

export const load: PageServerLoad = async ({ params, locals: { user } }) => {
	try {
		const [post] = await db
			.select({
				slug: posts.slug,
				html: posts.html,
				readTime: posts.readTime,
				createdAt: sql<string>`to_char(${posts.createdAt}, 'Mon DD, YYYY')`,
				updatedAt: sql<string>`to_char(updated_at, 'Mon DD, YYYY')`,
				tags: sql<string[]>`array_agg(${tags.name}) FILTER (WHERE ${tags.name} IS NOT NULL)`,
				restricted: posts.restricted,
				visible: posts.visible
			})
			.from(posts)
			.leftJoin(postsTags, eq(postsTags.postId, posts.id))
			.leftJoin(tags, eq(tags.id, postsTags.tagId))
			.where(eq(posts.slug, params.slug))
			.groupBy(posts.id);

		// TODO: Confirm on discord if this is safe
		if ((post.restricted && user?.role !== "authenticated") || (!post.visible && user?.email !== ADMIN_EMAIL)) throw redirect(303, '/login');

		return { post };
	} catch (error: any) {
		if (isRedirect(error)) throw error;
		return svelteError(404, error.message);
	}
};

export const actions = {
	delete: async ({ params, locals: { user } }) => {
		try {
			// TODO: The post should only be deleted by the admin. Question the robustness of the below line on discord.
			if (user?.email !== ADMIN_EMAIL) return fail(403, { error: 'Access Denied' });
			// First, delete all associated entries in the postsTags table
			await db
				.delete(postsTags)
				.where(
					eq(
						postsTags.postId,
						db.select({ id: posts.id }).from(posts).where(eq(posts.slug, params.slug))
					)
				);

			// Then delete the post
			await db.delete(posts).where(eq(posts.slug, params.slug));
		} catch (error: any) {
			return fail(404, { error: error.message });
		}
		throw redirect(303, '/');
	}
};
