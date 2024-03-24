import type { PageLoad } from "./$types";
import { db, posts } from "$lib/server/db";
import { eq } from "drizzle-orm";

export const load: PageLoad = async ({ params }) => {
  const allPosts = await db.select().from(posts);
  if (allPosts.length === 0) {
    return;
  }
  return {
    posts: allPosts,
  };
};
