import { json } from '@sveltejs/kit';
import { db, posts } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export async function DELETE({ params }) {
	await db.delete(posts).where(eq(posts.slug, params.slug));
	return json({ deleted: true });
}

//     if ((await getSession())?.user?.email !== "shinde27yash@gmail.com")
//       return fail(401, {
//         error: "You are unauthorized to make a post.",
//       });
//     const formData = await request.formData();
//     let title = formData.get("title")?.toString().trim() ?? "";
//     let content = formData.get("content")?.toString().trim() ?? "";

//     if (title.length < 12)
//       return fail(422, {
//         title,
//         content,
//         error: "Title should be longer than 12 characters.",
//       });

//     if (title.length > 64)
//       return fail(422, {
//         title,
//         content,
//         error: "Title should be shorter than 64 characters.",
//       });

//     if (content.length < 1000)
//       return fail(422, {
//         title,
//         content,
//         error: "Content should have more than 100 characters.",
//       });

//     // Create a slug for the title
//     let slug = slugify(title, {
//       lower: true,
//       strict: true,
//     });

//     // Check for existing posts with same slugs
//     let [{ exists }] = await db.execute(
//       sql`select exists(select 1 from ${posts} where ${posts.slug} = ${slug})`,
//     );
//     if (exists)
//       return fail(409, {
//         title,
//         content,
//         error: "A post with a similar title already exits.",
//       });

//     // calculate read time of the post
//     const readTime = readingTime(content, 230).minutes;
//     try {
//       await db.insert(posts).values({ slug, title, content, readTime });
//     } catch (error: any) {
//       return fail(401, { title, content, error: error.message });
//     }
//     redirect(303, slug);
//   },
// } satisfies Actions;
