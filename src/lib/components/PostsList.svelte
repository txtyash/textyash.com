<script lang="ts">
	import type { PostSummary } from '$lib/types';
	import Icon from '@iconify/svelte';
	import { fade, slide } from 'svelte/transition';

	export let posts: PostSummary[] = [];
	export let totalPages: number;
	export let page: number;
</script>

{#each posts as post}
	<div in:slide|global={{ delay: 460, duration: 400 }} class="relative">
		<a class="card card-hover mt-3 block p-4" href="posts/{post?.slug}">
			<p class="line-clamp-2 font-semibold sm:text-xl">
				{#if post?.visible === false}
					<Icon icon="vaadin:eye-slash" class="inline-block text-red-500" />
				{/if}
				{post?.title}
			</p>
			<div class="grid grid-cols-2 py-1">
				<p>{post?.readTime} min read</p>
				<p class="text-right font-semibold">{post?.createdAt}</p>
			</div>
		</a>
		{#if post.restricted}
			<span class="variant-filled badge absolute right-0 top-0">Exclusive</span>
		{/if}

		<div class="flex gap-2" in:fade|global={{ delay: 900 }}>
			{#if totalPages > 1}
				{#each Array.from({ length: totalPages }) as _, index}
					<button
						class="{page === index + 1 ? 'variant-filled' : 'variant-soft'} btn"
						on:click={() => (page = index + 1)}
					>
						{index + 1}
					</button>
				{/each}
			{/if}
		</div>
	</div>
{/each}
