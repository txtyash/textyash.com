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
		<div class="m-2 my-8 grid grid-cols-2 items-center p-2">
			<img
				class="mx-auto h-32 w-32 rounded-xl object-cover outline outline-offset-4 sm:h-48 sm:w-48"
				src="/images/profile.webp"
				alt="Yash's profile"
			/>
			<p class="text-sm sm:text-lg">
				Hi, I’m Yash, a software developer. I <span
					class="animate-pulse underline decoration-pink-500 decoration-wavy">love</span
				> technology & music. I occasionaly jot down my thoughts here : )
			</p>
		</div>

		<div class="relative m-2 flex w-auto justify-center px-4">
			<button
				type="button"
				on:click={() => (showPosts = !showPosts)}
				class="variant-filled btn z-10"
			>
				{showPosts ? 'Show Links' : 'Show Posts'}
			</button>
			<!-- MY HORIZONTAL LINE -->
			<div
				class="absolute top-1/2 z-0 h-0.5 w-full -translate-y-1/2 bg-stone-400 dark:bg-stone-400"
			/>
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
