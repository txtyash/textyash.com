export async function fetchPosts() {
	return  await fetch("http://localhost:3000").then((data) => data.json());
};
