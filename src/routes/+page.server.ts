import { json } from "@sveltejs/kit";
import type { Component } from "svelte";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const blogs: BlogMetadata[] = [];

  const paths: Record<string, unknown> = import.meta.glob("/src/routes/blog/*.md", { eager: true });

  for (const path in paths) {
    const file = paths[path] as {
      default: Component;
      metadata: BlogMetadata;
    };
    const slug: string | null = path.split("/").at(-1)?.replace(".md", "") ?? null;
    if (slug == null) {
      // TODO: 404 error
    }
    const metadata: any = file.metadata;
    const post: BlogMetadata = { ...metadata, slug };
    post.published && blogs.push(post);
  }

  return {
    blogs,
  };
};
