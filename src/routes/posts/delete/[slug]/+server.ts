import { json } from '@sveltejs/kit';
import { db, posts } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export async function DELETE({ params, locals: { supabase } }) {
	const post = await db
		.select({
			imagePath: posts.imagePath
		})
		.from(posts)
		.where(eq(posts.slug, params.slug));
	await supabase.storage.from('cover-images').remove([post[0].imagePath]);
	await db.delete(posts).where(eq(posts.slug, params.slug));
	await db.delete(posts).where(eq(posts.slug, params.slug));
	return json({ deleted: true });
}
