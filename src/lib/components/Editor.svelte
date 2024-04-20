<script lang="ts">
	import { parse } from '$lib/client';
	import type { SupabaseClient } from '@supabase/supabase-js';
	export let post: {
		error: string;
		title: string;
		hidden?: boolean;
		content: string;
		client?: SupabaseClient;
	};
	let parsed: string;
	let parsingError: string;
	let preview = false;

	$: parse(post.content).then(
		(html) => (parsed = html),
		(error) => (parsingError = error)
	);
</script>

<div class="m-2 flex justify-around">
	<button type="button" on:click={() => (preview = !preview)} class="variant-filled btn">
		{preview ? 'Edit' : 'Preview'}
	</button>
</div>

<hr />

<!-- Post Preview -->
{#if preview}
	<!-- Start Parsing the Post -->
	<div>
		<!-- Post Title -->
		<h1 class="h1 my-2">{post?.title}</h1>

		<!-- Post Parsing Failure -->
		{#if parsingError}
			<div class="text-center">
				<p class="font-bold text-red-500">Failed to parse</p>
				{parsingError}
			</div>
		{:else}
			<!-- Successfully parsed content -->
			<div class="prose my-6 max-w-none dark:prose-invert">
				{@html parsed}
			</div>
		{/if}
	</div>

	<!-- Post Editor -->
{:else}
	<form method="POST">
		<!-- Post Title -->
		<input
			minlength="12"
			maxlength="64"
			class="input my-2"
			type="text"
			name="title"
			bind:value={post.title}
			placeholder="Post Title"
		/>

		<!-- Hide Post -->
		<label class="flex items-center space-x-2">
			<span>Hide Post?</span>
			<input class="checkbox" type="checkbox" name="hidden" bind:checked={post.hidden} />
		</label>

		{#if post?.error}
			<p class="m-2 text-red-500"><b>Error:</b> {post?.error}</p>
		{/if}

		<!-- Parsed Content goes to the database -->
		<input type="hidden" name="content" bind:value={parsed} />

		<!-- Post Content Editor -->
		<textarea
			minlength="1000"
			class="textarea my-2"
			rows="28"
			bind:value={post.content}
			placeholder="Write your new post..."
		/>

		<button type="submit" class="variant-filled btn my-2">Post</button>
	</form>
{/if}
