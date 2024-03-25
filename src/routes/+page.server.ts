import type { PageLoad } from "./$types";
import { db, posts } from "$lib/server/db";
import { sql, getTableColumns } from "drizzle-orm";

export const load: PageLoad = async ({ params }) => {
  const allPosts = await db
    .select({
      ...getTableColumns(posts),
      createdAt: sql<string>`to_char(created_at, 'Mon DD, YYYY')`,
    })
    .from(posts);

  if (allPosts.length === 0) {
    return;
  }
  return {
    posts: allPosts,
  };
};
