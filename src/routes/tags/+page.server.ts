import { db, postsTags, tags } from '$lib/server/db';
import { eq, sql } from 'drizzle-orm';
import { fail, error as svelteError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
    try {
        const tagsWithPostCount = await db
            .select({
                id: tags.id,
                name: tags.name,
                createdAt: sql<string>`to_char(${tags.createdAt}, 'Mon DD, YYYY')`,
                posts: sql<number>`count(${postsTags.postId})`,
            })
            .from(tags)
            .leftJoin(postsTags, sql`${tags.id} = ${postsTags.tagId}`)
            .groupBy(tags.id)
            .orderBy(tags.name);

        return { allTags: tagsWithPostCount };
    } catch (error: any) {
        return svelteError(404, error.message);
    }
};


export const actions = {
    create: async ({ request, params, locals: { user } }) => {
        const formData = await request.formData();
        const name = formData.get('name')?.toString().trim() ?? '';
        if (!name || name?.length < 2) return fail(422, { error: "Tag name should have at least 2 characters" });
        try {
            // Check for existing tag
            const [{ exists }] = await db.execute(
                sql`select exists(select 1 from ${tags} where ${tags.name} = ${name})`
            );

            if (exists)
                return fail(409, {
                    name,
                    error: 'Tag exists'
                });

            await db
                .insert(tags)
                .values({ name });

        } catch (error: any) {
            // TODO: Check if correct status codes are returned everywhere
            return fail(404, { error: error.message });
        }
    },

    delete: async ({ request, params, locals: { user } }) => {
        const formData = await request.formData();
        const id = Number(formData.get('id'));
        try {
            // First, delete all associated entries in the postsTags table
            await db
                .delete(postsTags)
                .where(
                    eq(
                        postsTags.tagId,
                        id
                    )
                );

            // Then delete the post
            await db.delete(tags).where(eq(tags.id, id));
        } catch (error: any) {
            return fail(404, { error: error.message });
        }
    },

    update: async ({ request }) => {
        const formData = await request.formData();
        const id = Number(formData.get('id'));
        const name = formData.get('name')?.toString().trim();
        if (!name || name?.length < 2) return fail(422, { error: "Tag name should have at least 2 characters" });
        try {
            await db
                .update(tags)
                .set({ name })
                .where(eq(tags.id, id));
        } catch (error: any) {
            return fail(404, { error: error.message });
        }
    }
};

