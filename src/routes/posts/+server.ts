import { db, posts } from '$lib/server/db';
import { and, eq, lt, desc, sql } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import type { Post } from '$lib/components';

export async function GET({ url, locals: { user } }) {
	let isAdmin = false;
	if (user?.email === 'shinde27yash@gmail.com') isAdmin = true;

	const id: number = Number(url.searchParams.get('id'));
	let chunk: Post[] = [];

	if (id === -1 && isAdmin)
		chunk = await db
			.select({
				id: posts.id,
				slug: posts.slug,
				title: posts.title,
				content: posts.content,
				readTime: posts.readTime,
				createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`,
				hidden: posts.hidden
			})
			.from(posts)
			.orderBy(desc(posts.id))
			.limit(6);
	else if (isAdmin)
		chunk = await db
			.select({
				id: posts.id,
				slug: posts.slug,
				title: posts.title,
				content: posts.content,
				readTime: posts.readTime,
				createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`,
				hidden: posts.hidden
			})
			.from(posts)
			.where(lt(posts.id, id))
			.orderBy(desc(posts.id))
			.limit(6);
	else if (id === -1)
		chunk = await db
			.select({
				id: posts.id,
				slug: posts.slug,
				title: posts.title,
				content: posts.content,
				readTime: posts.readTime,
				createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`,
				hidden: posts.hidden
			})
			.from(posts)
			.where(eq(posts.hidden, false))
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
				createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`,
				hidden: posts.hidden
			})
			.from(posts)
			.where(and(lt(posts.id, id), eq(posts.hidden, false)))
			.orderBy(desc(posts.id))
			.limit(6);
	return json({ chunk });
}
