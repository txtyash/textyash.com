<script lang="ts">
	import { goto } from '$app/navigation';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { parse } from '$lib/client';

	export let data;
	let post = data.post;
	async function deletePost() {
		console.log('invoked!');
		const response = await fetch('/posts/delete/' + post.slug, {
			method: 'DELETE'
		});
		let { deleted } = await response.json();
		console.log(deleted);
		if (deleted) goto('/');
	}
</script>

<h1 class="h1 my-4">{post?.title}</h1>

<p class="mb-10 mt-4"><i>Last Edited:</i> {post?.lastEdit}</p>

{#if data?.session?.user.email === 'shinde27yash@gmail.com'}
	<div class="my-4 flex items-center justify-around">
		<button type="button" class="variant-filled btn" on:click={deletePost}> Delete </button>
		<a class="variant-filled btn" href="/posts/edit/{post?.slug}">Edit</a>
	</div>
{/if}

{#await parse(post?.content)}
	<div class="flex justify-center">
		<ProgressRadial class="my-8 w-8" />
	</div>
{:then parsed}
	<div class="prose max-w-none dark:prose-invert">
		{@html parsed}
	</div>
{:catch error}
	<div class="text-center">
		Parsing Error: {error.message}
	</div>
{/await}
