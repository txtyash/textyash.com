<script lang="ts">
	import { marked } from 'marked';
	export let post: {
		error: string;
		title: string;
		content: string;
	};
	let preview = false;
	$: parsed = marked.parse(post?.content);
</script>

<div class="m-2 flex justify-center">
	<button type="button" on:click={() => (preview = !preview)} class="variant-filled btn">
		{preview ? 'Edit' : 'Preview'}
	</button>
</div>

{#if preview}
	<div>
		<h1 class="h1 my-2">{post?.title}</h1>
		<div class="prose my-6 dark:prose-invert">
			{@html parsed}
		</div>
	</div>
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
