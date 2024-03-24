import type { PageLoad } from "./$types";
import { db, posts } from "$lib/server/db";
import { eq } from "drizzle-orm";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
  const post = await db.select().from(posts).where(eq(posts.slug, params.slug));
  if (post.length === 0) {
    error(404);
  }
  return {
    post: post[0],
  };
};
