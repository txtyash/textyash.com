import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { db, posts } from "$lib/server/db";
import { sql } from "drizzle-orm";
import slugify from "slugify";
import { readingTime } from "reading-time-estimator";

export const actions = {
  default: async ({ request, locals: { getSession } }) => {
    if ((await getSession())?.user?.email !== "shinde27yash@gmail.com")
      return fail(401, {
        error: "You are unauthorized to make a post.",
      });
    const formData = await request.formData();
    let title = formData.get("title")?.toString().trim() ?? "";
    let content = formData.get("content")?.toString().trim() ?? "";

    if (title.length < 12)
      return fail(400, {
        title,
        content,
        error: "Title should be longer than 12 characters.",
      });

    if (title.length > 64)
      return fail(400, {
        title,
        content,
        error: "Title should be shorter than 64 characters.",
      });

    if (content.length < 1000)
      return fail(400, {
        title,
        content,
        error: "Content should have more than 100 characters.",
      });

    // Create a slug for the title
    let slug = slugify(title, { remove: /[*+~.()'"!:@]/g });
    // If a post with same slug exists, throw an intentional error
    // SELECT EXISTS(SELECT 1 FROM contact WHERE id=12)
    console.log(
      await db.execute(
        sql`select exists(select 1 from ${posts} where ${posts.slug} = ${slug})`,
      ),
    );
    // TODO: Check if a post alredy exists
    // if (
    //   await db.execute(
    //     sql`select exists(select 1 from ${posts} where ${posts.slug} = ${slug})`,
    //   )
    // )
    //   return fail(409, {
    //     title,
    //     content,
    //     error: "A post with a similar title already exits.",
    //   });
    // calculate read time of the post
    const readTime = readingTime(content, 230).minutes;
    try {
      await db.insert(posts).values({ slug, title, content, readTime });
    } catch (error: any) {
      return fail(401, { title, content, error: error.message });
    }
    throw redirect(303, "posts/" + slug);
  },
} satisfies Actions;
