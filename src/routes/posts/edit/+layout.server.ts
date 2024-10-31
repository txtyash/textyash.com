// Load all the tags and send in data to the editor
import { db, tags, postsTags } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';
import { error as svelteError } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';

export const load: LayoutServerLoad = async () => {
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