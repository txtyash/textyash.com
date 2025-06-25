import { formatToAmericanDate } from "$lib/helpers";
import { json } from "@sveltejs/kit";
import type { Component } from "svelte";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const blogs: BlogMetadata[] = [];

  // TODO: Only import files that follow the naming convention YYYY-MM-DD-[a-z0-9\-]+.md
  const paths: Record<string, unknown> = import.meta.glob("/src/routes/blog/*.md", { eager: true });

  for (const path in paths) {
    const file = paths[path] as {
      default: Component;
      metadata: BlogMetadata;
    };
    const slugWithDate: string = path.split("/").at(-1)?.replace(".md", "");
    const slug: string | null = slugWithDate.slice(11) ?? null;
    if (slug !== null) {
      const metadata: any = file.metadata;
      const date: Date = formatToAmericanDate(new Date(slugWithDate.slice(0, 10)));
      const post: BlogMetadata = { ...metadata, slug, date };
      post.published && blogs.push(post);
    }
  }

  return {
    blogs,
  };
};

/* TODO:
 * Build step:
 * Throw errors for files in which the slugified version of the title inside all the files mismatches the slug in the file name
 * Throw errors for files which do not follow the naming convention YYYY-MM-DD-[a-z0-9\-]+.md
 */
