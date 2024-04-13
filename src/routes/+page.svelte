<script lang="ts">
	import { Links, PostsList, type Post } from '$lib/components';
	import { onMount } from 'svelte';
	import { posts } from '$lib/components';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { fly, fade, slide } from 'svelte/transition';
	let showPosts = true;
	let animate = false;
	let loadingPosts = true;
	let endOfPosts = false;
	onMount(async () => {
		animate = true;
		while (!endOfPosts) {
			await pushChunk();
		}
		loadingPosts = false;
	});

	async function pushChunk() {
		const id = $posts.length === 0 ? -1 : $posts[$posts.length - 1].id;
		const chunk = await getChunk(id);
		if (chunk.length < 6) endOfPosts = !endOfPosts;
		posts.update((posts) => posts.concat(chunk));
	}

	async function getChunk(id?: number): Promise<Post[]> {
		loadingPosts = true;
		const response = await fetch('/posts?id=' + id, {
			method: 'GET'
		});
		loadingPosts = false;
		return (await response.json()).chunk;
	}
</script>

{#if animate}
	<div in:fly={{ y: -200, duration: 2000 }} out:fade>
		<div class="m-2 grid grid-cols-2 items-center p-2">
			<img
				class="mx-auto h-32 w-32 rounded-xl object-cover"
				src="/images/face.jpg"
				alt="Yash's profile"
			/>
			<p class="flex items-center text-sm sm:text-lg">
				Hi, I’m Yash, a software developer. I love technology & music. I occasionaly jot down my
				thoughts here : )
			</p>
		</div>

		<div class="m-2 flex w-auto justify-center px-4">
			<button type="button" on:click={() => (showPosts = !showPosts)} class="variant-filled btn">
				{showPosts ? 'Show Links' : 'Show Posts'}
			</button>
		</div>
	</div>
{/if}

{#if showPosts}
	{#if $posts.length === 0 && endOfPosts}
		<p class="my-12 text-center">Yash hasn't posted anything yet.</p>
	{:else}
		<PostsList />
		{#if animate && !endOfPosts}
			<div transition:slide|global class="flex justify-center">
				{#if loadingPosts}
					<ProgressRadial class="w-8" />
				{/if}
			</div>
		{/if}
	{/if}
{:else}
	<Links />
{/if}
