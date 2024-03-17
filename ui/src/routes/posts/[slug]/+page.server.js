import { fetchPosts } from "../../data.js";

export async function load({ params }) {
  const posts = await fetchPosts();
	const post = posts.find((post) => post.slug === params.slug);

	return {
		post
	};
}

