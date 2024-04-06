import { db, posts } from '$lib/server/db';
import { lt, desc, sql } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const id: number = url.searchParams.get('id');
	const chunk = await db
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
		.limit(3);
	return json({ chunk });
}
