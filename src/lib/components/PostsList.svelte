<script lang="ts">
	import Icon from '@iconify/svelte';
	import { posts } from './postsStore';
	import { slide } from 'svelte/transition';
</script>

{#each $posts as post}
	<div in:slide|global={{ delay: 400, duration: 900 }}>
		<a class="card card-hover my-4 block p-4" href="posts/{post?.slug}">
			<p class="line-clamp-2 font-semibold sm:text-xl">
				{#if post?.hidden}
					<Icon icon="vaadin:eye-slash" class="inline-block text-red-500" />
				{/if}
				{post?.title}
			</p>
			<p class="line-clamp-3 max-w-none">
				{post?.description}
			</p>
			<div class="grid grid-cols-2 py-1">
				<p>{post?.readTime} min read</p>
				<p class="text-right font-semibold">{post?.createdAt}</p>
			</div>
		</a>
	</div>
{/each}
