<script lang="ts">
	import { parse } from '$lib/client';
	import CoverImage from './CoverImage.svelte';
	import ImageDownload from './ImageDownload.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	export let post: {
		error: string;
		title: string;
		hidden?: boolean;
		content: string;
		client?: SupabaseClient;
		imagePath?: string;
	};
	let parsed: string;
	let parsingError: string;
	let preview = false;
	let files: FileList;
	let file: File;
	let imageUrl: string;
	let imageExt: string;

	// image is stored as base64
	$: image = imageUrl?.replace('data:', '').replace(/^.+,/, '');

	async function uploadImage() {
		try {
			if (!files || files.length !== 1) throw new Error('You must only select 1 file.');
			file = files[0];

			if (file.size > 9000000) throw new Error('File size must be less than 9MB.');

			imageExt = file.name.split('.').pop() ?? '';

			if (file) {
				const reader = new FileReader();
				reader.addEventListener('load', function () {
					imageUrl = String(reader.result);
				});
				reader.readAsDataURL(file);
			}
		} catch (error: any) {
			post.error = error.message;
		}
		return;
	}

	$: parse(post.content).then(
		(html) => (parsed = html),
		(error) => (parsingError = error)
	);
	$: removeImage = post.imagePath === '';
</script>

<div class="m-2 flex justify-around">
	<button type="button" on:click={() => (preview = !preview)} class="variant-filled btn">
		{preview ? 'Edit' : 'Preview'}
	</button>
	<!-- Remove Image -->
	{#if imageUrl || post.imagePath}
		<button
			type="button"
			class="variant-filled-tertiary btn"
			on:click={() => {
				imageUrl = '';
				post.imagePath = '';
			}}
		>
			Remove Image
		</button>
	{:else}
		<!-- Add Image -->
		<label class="variant-filled-tertiary btn">
			<span>Upload Image</span>
			<input class="hidden" type="file" accept="image/*" bind:files on:change={uploadImage} />
		</label>
	{/if}
</div>

<!-- Post Preview -->
{#if preview}
	<!-- Start Parsing the Post -->
	<div>
		<!-- Post Title -->
		<h1 class="h1 my-2">{post?.title}</h1>
		<!-- Cover Image Preview -->
		{#if imageUrl}
			<CoverImage src={imageUrl} alt="Preview" />
		{:else if post.client && post.imagePath}
			<ImageDownload client={post.client} imagePath={post.imagePath} />
		{/if}
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

		<!-- Cover Image for Post -->
		<input type="hidden" name="image" bind:value={image} />
		<input type="hidden" name="imageExt" bind:value={imageExt} />
		<input type="hidden" name="removeImage" bind:value={removeImage} />

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
