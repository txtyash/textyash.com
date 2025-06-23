import type { PageLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const slug = params.slug;
  const file = await import(`../${slug}.md`);
  const blog: Blog = { metadata: file.metadata, content: file.default };
  return blog;
};
