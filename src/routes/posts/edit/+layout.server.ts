// Load all the tags and send in data to the editor
import { db, posts, tags, postsTags } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';
import { ADMIN_EMAIL } from '$env/static/private';
import { type RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ params, locals: { user } }: RequestEvent) => {
    const isAdmin: boolean = user?.email === ADMIN_EMAIL;

    if (!isAdmin) return;

    const result: { name: string }[] = await db
        .select({
            name: tags.name,
        })
        .from(posts)
        .innerJoin(postsTags, eq(posts.id, postsTags.postId))
        .innerJoin(tags, eq(postsTags.tagId, tags.id))
        .where(eq(posts.slug, params.slug ?? ''));

    const postTags: string[] = result.map(row => row.name);

    return { postTags };
};

// add/delete tags to/from table. do it on the landing page?
// add/delete tags on posts. do it on both new and update post routes?