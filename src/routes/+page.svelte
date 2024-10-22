<script lang="ts">
	import { Links, PostsList } from '$lib/components';
	import { onMount } from 'svelte';
	import { ProgressRadial, Avatar } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import { fly, fade } from 'svelte/transition';
	import type { PostSummary } from '$lib/types';
	import { browser } from '$app/environment';

	export let data;

	let showPosts = true;
	let animate = false;
	let page: number = 1;
	let size = 9;
	let loadingPosts: boolean = true;
	let totalPages: number;
	let tagIds: string = '[]';
	const posts: Writable<PostSummary[]> = writable([]);
	$: url = `/posts?page=${page}&size=${size}&tagIds=${tagIds}`;
	$: if (browser && url) fetchPosts(url);

	async function fetchPosts(url: string) {
		loadingPosts = true;
		const response = await fetch(url, {
			method: 'GET'
		});
		const data = await response.json();
		posts.set(data.posts); // TODO: Caching
		totalPages = Math.ceil(data.count / size);
		loadingPosts = false;
	}

	onMount(async () => {
		animate = true;
		fetchPosts(url); // update posts instead of setting(like caching data)
	});

	let tagSelection: Record<number, boolean> = Object.fromEntries(
		data.allTags.map((tag) => [tag.id, false])
	);

	function toggle(tag: number): void {
		tagSelection[tag] = !tagSelection[tag];
		page = 1;
		tagIds = JSON.stringify(
			Object.entries(tagSelection)
				.filter(([, value]) => value)
				.map(([key]) => Number(key))
		);
	}
</script>

<div class="container mx-auto">
	{#if animate}
		<div in:fly={{ y: -200, duration: 2000 }} out:fade>
			<div class="m-6 mx-auto flex w-3/5 items-center justify-around gap-6">
				<Avatar
					class="mx-auto w-32 sm:w-48"
					src="/images/profile.png"
					initials="YS "
					alt="Yash's profile"
					rounded="rounded-md"
				/>
				<p class="text-sm sm:text-lg">
					Hi, I'm Yash, a software developer. I
					<span class="animate-pulse underline decoration-pink-500 decoration-wavy">love</span> technology
					& music. I occasionally jot down my thoughts here : )
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
				<!-- TODO: squiggly hr -->
				<div
					class="absolute top-1/2 z-0 h-0.5 w-full -translate-y-1/2 bg-stone-400 dark:bg-stone-400"
				/>
			</div>
		</div>

		{#if !(tagIds === '[]' && $posts.length === 0)}
			<div class="flex gap-2">
				{#each Object.keys(tagSelection) as f}
					<button
						class="chip {tagSelection[Number(f)] ? 'variant-filled' : 'variant-soft'}"
						on:click={() => {
							toggle(Number(f));
						}}
						on:keypress
					>
						<span class="capitalize">
							{data.allTags.find((entry) => entry.id === Number(f))?.name}
						</span>
					</button>
				{/each}
			</div>
		{/if}

		{#if loadingPosts}
			<div class="mt-4 flex justify-center">
				<ProgressRadial class="w-9" />
			</div>
		{:else if $posts}
			{#if $posts.length === 0 && showPosts}
				<!-- if no posts and no tag ids -->
				<p class="my-12 text-center" in:fade={{ delay: 400 }}>No posts found</p>
				<!-- else yash hasn't posted any categories blog -->
			{:else if showPosts}
				<PostsList posts={$posts} bind:totalPages bind:page />
			{:else}
				<Links />
			{/if}
		{/if}
	{/if}
</div>
