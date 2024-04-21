<script lang="ts">
	import { parse } from '$lib/client';
	import type { SupabaseClient } from '@supabase/supabase-js';
	export let post: {
		error: string;
		title: string;
		description: string;
		hidden?: boolean;
		markdown: string;
		client?: SupabaseClient;
	};
	let parsed: string;
	let parsingError: string;
	let preview = false;

	$: parse(post.markdown).then(
		(html) => (parsed = html),
		(error) => (parsingError = error)
	);
</script>

<div class="m-2 flex justify-around">
	<!-- Markdown Preview button -->
	<button type="button" on:click={() => (preview = !preview)} class="variant-filled btn">
		{preview ? 'Edit' : 'Preview'}
	</button>
</div>

<hr />

<!-- Submission errors -->
{#if post?.error}
	<p class="m-2 text-red-500"><b>Error:</b> {post?.error}</p>
{/if}

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
			<!-- Successfully parsed markdown content -->
			<div class="prose my-6 max-w-none dark:prose-invert">
				{@html parsed}
			</div>
		{/if}
	</div>

	<!-- Post Editor -->
{:else}
	<form method="POST" id="blogpost">
		<!-- Post Title -->
		<input
			required
			minlength="12"
			maxlength="72"
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

		<!-- Post Description -->
		<textarea
			required
			minlength="64"
			maxlength="192"
			rows="3"
			class="textarea my-2"
			name="description"
			bind:value={post.description}
			placeholder="Describe your new post..."
		/>

		<!-- Markdown Editor -->
		<textarea
			required
			minlength="1000"
			class="textarea my-2"
			name="markdown"
			rows="28"
			bind:value={post.markdown}
			placeholder="Write your new post..."
		/>

		<!-- Parsed Markdown Content -->
		<input type="hidden" name="html" bind:value={parsed} />

		<!-- Form Submit button -->
		<button type="submit" form="blogpost" class="variant-filled btn mx-2">Post</button>
	</form>
{/if}
