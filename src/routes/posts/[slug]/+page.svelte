<script lang="ts">
	import { goto } from '$app/navigation';
	import { ImageUpload, ImagePreview } from '$lib/components';

	export let data;

	const post = data.post;

	// Delete post
	async function deletePost() {
		const response = await fetch('/posts/delete/' + post.slug, {
			method: 'DELETE'
		});
		let { deleted } = await response.json();
		if (deleted) goto('/');
	}
</script>

{#if data?.session?.user.email === 'shinde27yash@gmail.com'}
	<div class="my-4 flex items-center justify-around">
		<!-- Delete's Post and cover image -->
		<button type="button" class="variant-filled btn" on:click={deletePost}> Delete </button>

		<!-- Upload Cover Image to Supabase -->
		<ImageUpload fileName={post.slug} />

		<!-- Edit Post -->
		<a class="variant-filled btn" href="/posts/edit/{post?.slug}">Edit</a>
	</div>
	<hr />
{/if}

<h1 class="h1 my-4">{post?.title}</h1>

<p class="mb-10 mt-4"><i>Last Edited:</i> {post?.lastEdit}</p>

<ImagePreview fileName={post.slug} />

<div class="prose max-w-none dark:prose-invert">
	{@html post?.content}
</div>
