import { json } from '@sveltejs/kit';
import { db, posts } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export async function DELETE({ params }) {
	await db.delete(posts).where(eq(posts.slug, params.slug));
	return json({ deleted: true });
}
