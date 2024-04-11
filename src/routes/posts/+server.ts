import { db, posts } from '$lib/server/db';
import { lt, desc, sql } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import type { Post } from '$lib/components';

export async function GET({ url }) {
	const id: number = Number(url.searchParams.get('id'));
	let chunk: Post[] = [];
	if (id === -1)
		chunk = await db
			.select({
				id: posts.id,
				slug: posts.slug,
				title: posts.title,
				content: posts.content,
				readTime: posts.readTime,
				createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`
			})
			.from(posts)
			.orderBy(desc(posts.id))
			.limit(6);
	else
		chunk = await db
			.select({
				id: posts.id,
				slug: posts.slug,
				title: posts.title,
				content: posts.content,
				readTime: posts.readTime,
				createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`
			})
			.from(posts)
			.where(lt(posts.id, id))
			.orderBy(desc(posts.id))
			.limit(6);
	return json({ chunk });
}
