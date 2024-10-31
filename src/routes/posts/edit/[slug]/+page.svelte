<script lang="ts">
	import { Editor } from '$lib/components';
	import type { EditorPost } from '$lib/types';
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	export let data: PageData;

	let post: EditorPost | null = null;
	if (data && data.post)
		post = {
			error: form?.error ?? null,
			markdown: form?.markdown ?? data?.post?.markdown,
			visible: form?.visible ?? data?.post?.visible,
			restricted: form?.restricted ?? data?.post?.restricted,
			tags: form?.tags ?? data?.post?.tags
		};
</script>

{#if post}
	<Editor bind:post allTags={data.allTags} />
{:else}
	<p>Error loading post</p>
{/if}
