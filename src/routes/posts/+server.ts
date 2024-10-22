import { db, posts, postsTags, tags } from '$lib/server/db';
import { eq, desc, sql, inArray, and, count } from 'drizzle-orm';
import { json, type RequestEvent } from '@sveltejs/kit';
import type { PostSummary } from '$lib/types';
import { ADMIN_EMAIL } from '$env/static/private';

export async function GET({ url, locals: { user } }: RequestEvent) {
	const page: number = Number(url.searchParams.get('page')) || 1;
	const size: number = Number(url.searchParams.get('size')) || 6;
	const tagIds: number[] = JSON.parse(url.searchParams.get('tagIds') || '[]'); // comma separated list of tags
	const isAdmin: boolean = user?.email === ADMIN_EMAIL;

	const baseQuery = db
		.select({
			slug: posts.slug,
			title: posts.title,
			readTime: posts.readTime,
			createdAt: sql<string>`to_char(${posts.createdAt}, 'Mon DD, YYYY')`,
			visible: posts.visible,
			restricted: posts.restricted,
			tags: sql<string[]>`array_agg(${tags.name}) FILTER (WHERE ${tags.name} IS NOT NULL)`,
		})
		.from(posts)
		.leftJoin(postsTags, eq(postsTags.postId, posts.id))
		.leftJoin(tags, eq(tags.id, postsTags.tagId))
		.groupBy(posts.id)
		.orderBy(desc(posts.id))
		.limit(size)
		.offset((page - 1) * size);

	let list: PostSummary[];

	// TODO: Refactor and reduce
	if (isAdmin) {
		if (tagIds.length) list = await baseQuery.where(inArray(tags.id, tagIds));
		else list = await baseQuery;
	}
	else if (tagIds.length) {
		list = await baseQuery.where(and(inArray(tags.id, tagIds), eq(posts.visible, true)));
	}
	else {
		list = await baseQuery.where(eq(posts.visible, true));
	}

	console.log("server posts:", list);

	let totalPosts: { count: number }[];

	if (tagIds.length) totalPosts = await db.select({ count: count() }).from(postsTags).where(inArray(postsTags.tagId, tagIds));
	else totalPosts = await db.select({ count: count() }).from(posts);
	console.log("Page skew:", tagIds, totalPosts);

	return json({ posts: list, count: totalPosts[0].count });
}