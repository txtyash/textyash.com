import { error as svelteError } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import { db, postsTags, tags } from '$lib/server/db';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
    try {
        const allTags = await db
            .select({
                id: tags.id,
                name: tags.name,
            })
            .from(tags)
            .leftJoin(postsTags, sql`${tags.id} = ${postsTags.tagId}`)
            .groupBy(tags.id)
            .orderBy(tags.name);

        return { allTags };
    } catch (error: any) {
        return svelteError(404, error.message);
    }
};