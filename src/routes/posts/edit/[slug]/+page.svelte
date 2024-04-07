<script lang="ts">
	import { Editor } from '$lib/components';
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	export let data: PageData;
	const post = {
		error: form?.error ?? '',
		title: form?.title ?? data?.post.title,
		content: form?.content ?? data?.post.content
	};
</script>

<Editor {post} />
