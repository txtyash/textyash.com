<script lang="ts">
	import { posts } from './postsStore';
	import { fade, slide } from 'svelte/transition';
</script>

{#each $posts as post}
	<div in:slide|global={{ delay: 400, duration: 900 }} out:fade|global>
		<a class="card card-hover my-4 block p-4" href="posts/{post?.slug}">
			<p class="line-clamp-2 font-semibold sm:text-xl">
				{post?.title}
			</p>
			<p class="line-clamp-2 sm:line-clamp-3">
				{post?.content}
			</p>
			<div class="grid grid-cols-2 py-1">
				<p>{post?.readTime} min read</p>
				<p class="text-right font-normal sm:font-semibold">{post?.createdAt}</p>
			</div>
		</a>
	</div>
{/each}
