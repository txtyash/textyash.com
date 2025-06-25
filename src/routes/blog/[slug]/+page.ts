import { formatToAmericanDate } from "$lib/helpers";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const slug = params.slug;

  // Get all markdown files
  const posts = import.meta.glob("../*.md", { eager: false });
  const rawPosts = import.meta.glob("../*.md", { eager: false, query: "?raw", import: "default" });

  // Find the file that contains the slug
  const matchingPath = Object.keys(posts).find(path => {
    const filename = path.split("/").pop() || "";
    // Match pattern: YYYY-MM-DD-slug.md
    return filename.match(new RegExp(`^\\d{4}-\\d{2}-\\d{2}-${slug}\\.md$`));
  });

  if (!matchingPath) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }

  // Import the matching file
  const file = await posts[matchingPath]();
  const rawContent = await rawPosts[matchingPath]();

  // Extract date from filename
  const filename = matchingPath.split("/").pop() || "";
  const date = formatToAmericanDate(filename.slice(0, 10)); // YYYY-MM-DD
  const readingTime = calculateReadingTime(rawContent); // In minutes

  const blog: Blog = {
    metadata: { ...file.metadata, date, readingTime },
    content: file.default,
  };

  return blog;
};

function calculateReadingTime(htmlContent) {
  const wordsPerMinute = 200;

  // Remove HTML tags and clean up text
  const text = htmlContent
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim();

  const wordCount = text.split(" ").filter(word => word.length > 0).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
