<script lang="ts">
	// TODO:
	import Icon from '@iconify/svelte';
	import type { ActionData } from './$types';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let data;
	export let deletionForm: ActionData;

	let loading: boolean = false;

	const post = data.post;
</script>

{#if loading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<ProgressRadial class="w-9" />
	</div>
{/if}

<div class="container mx-auto">
	<div class="my-2 flex items-center justify-between">
		<p>Written: {post?.createdAt}</p>
		<p>Updated: {post?.updatedAt}</p>
	</div>

	<hr />

	<div class="my-2 flex items-center justify-between gap-2">
		<!-- Post render -->
		<div class="flex overflow-x-auto p-1">
			{#if post.tags}
				{#each post.tags as tag}
					<span class="variant-soft chip m-1">{tag}</span>
				{/each}
			{/if}
		</div>

		{#if data?.isAdmin}
			<div class="flex gap-1">
				<!-- TODO: Confirmation Modal -->
				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						loading = true;

						return async ({ update }) => {
							await update();
							loading = false;
						};
					}}
				>
					<button type="submit" class="variant-soft btn">
						<Icon icon="mdi:bin" />
					</button>
				</form>
				<a class="variant-soft btn" href="/posts/edit/{post?.slug}">
					<Icon icon="material-symbols:edit" />
				</a>
				{#if deletionForm?.error}
					<p class="text-red-500">{deletionForm?.error}</p>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Post Render -->
	<div class="prose max-w-none dark:prose-invert">
		{@html post?.html}
	</div>
</div>
