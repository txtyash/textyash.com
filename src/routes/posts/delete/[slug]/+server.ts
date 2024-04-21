import { json, type RequestEvent } from '@sveltejs/kit';
import { db, posts } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export async function DELETE({ params, locals: { supabase } }: RequestEvent) {
	const post = await db
		.select({
			slug: posts.slug
		})
		.from(posts)
		.where(eq(posts.slug, params.slug));
	await supabase.storage.from('cover-images').remove([post[0].slug + 'jpeg']);
	await db.delete(posts).where(eq(posts.slug, params.slug));
	await db.delete(posts).where(eq(posts.slug, params.slug));
	return json({ deleted: true });
}
