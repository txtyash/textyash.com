<script lang="ts">
	import { parse } from '$lib/client';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	export let post: {
		error: string;
		title: string;
		content: string;
	};
	let preview = false;
</script>

<div class="m-2 flex justify-center">
	<button type="button" on:click={() => (preview = !preview)} class="variant-filled btn">
		{preview ? 'Edit' : 'Preview'}
	</button>
</div>

{#if preview}
	{#await parse(post?.content)}
		<div class="flex justify-center">
			<ProgressRadial class="w-8" />
		</div>
	{:then parsed}
		<div>
			<h1 class="h1 my-2">{post?.title}</h1>
			<div class="prose my-6 max-w-none dark:prose-invert">
				{@html parsed}
			</div>
		</div>
	{:catch error}
		<div class="text-center">
			Parsing Error: {error.message}
		</div>
	{/await}
{:else}
	<form method="POST">
		<input
			minlength="12"
			maxlength="64"
			class="input my-2"
			type="text"
			name="title"
			bind:value={post.title}
			placeholder="Post Title"
		/>

		{#if post?.error}
			<p class="m-2 text-red-500"><b>Error:</b> {post?.error}</p>
		{/if}

		<textarea
			minlength="1000"
			class="textarea my-2"
			rows="28"
			name="content"
			bind:value={post.content}
			placeholder="Write your new post..."
		/>

		<button type="submit" class="variant-filled btn my-2">Post</button>
	</form>
{/if}
