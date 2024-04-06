<script lang="ts">
	import { Links, PostsList } from '$lib/components';
	import { onMount } from 'svelte';
	import { posts } from '$lib/components';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	export let data;
	let showPosts = true;
	let loadingPosts = true;
	let id = data.latestPostID + 1;
	onMount(async () => {
		posts.set([]);
		while (true) {
			const response = await fetch('/posts?id=' + id, {
				method: 'GET'
			});
			let { chunk } = await response.json();
			if (chunk.length === 0) break;
			posts.update((posts) => posts.concat(chunk));
			id = $posts[$posts.length - 1].id;
			console.log('running');
		}
		loadingPosts = false;
	});
</script>

<div class="m-2 grid grid-cols-2 items-center p-2">
	<img
		class="mx-auto h-32 w-32 rounded-xl object-cover"
		src="/images/profile-crop.png"
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

<div class="">
	{#if showPosts}
		<PostsList />
		{#if loadingPosts}
			<div class="flex justify-center">
				<ProgressRadial class="w-8" />
			</div>
		{:else if !loadingPosts && $posts.length === 0}
			<p class="my-12 text-center">Yash hasn't posted anything yet.</p>
		{/if}
	{:else}
		<Links />
	{/if}
</div>

<!--
		{#await data?.posts}
			<p class="my-12 text-center">Loading Posts...</p>
		{:then posts}
			{#if posts.length === 0}
				<p class="my-12 text-center">Yash hasn't posted anything yet.</p>
			{:else}
				<p>{data?.totalPosts}</p>
				<PostsList {posts} />
			{/if}
		{:catch error}
			<p class="my-12 text-center">Failed to load posts: {error.message}</p>
		{/await}
-->
