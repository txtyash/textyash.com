import { fetchPosts } from "./data";

export async function load() {
	return {
		posts: await fetchPosts(),
	}
};
