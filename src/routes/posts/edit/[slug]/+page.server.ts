import type { PageLoad } from "./$types";
import { db, posts } from "$lib/server/db";
import { eq } from "drizzle-orm";

export const load: PageLoad = async ({ params }) => {
  let post;
  try {
    post = await db.select().from(posts).where(eq(posts.slug, params.slug));
  } catch (error: any) {
    error(404);
  }
  return {
    post: post,
  };
};
