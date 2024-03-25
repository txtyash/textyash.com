import type { PageLoad } from "./$types";
import { db, posts } from "$lib/server/db";
import { eq, sql, getTableColumns } from "drizzle-orm";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
  // const post = await db.select().from(posts).where(eq(posts.slug, params.slug));
  const post = await db
    .select({
      ...getTableColumns(posts),
      createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`,
      lastEdit: sql<string>`to_char(last_edit, 'Mon DD, YYYY')`,
    })
    .from(posts)
    .where(eq(posts.slug, params.slug));
  if (post.length === 0) {
    error(404);
  }
  return {
    post: post[0],
  };
};
