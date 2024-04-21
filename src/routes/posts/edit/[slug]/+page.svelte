<script lang="ts">
	import { Editor } from '$lib/components';
	import { client } from '$lib/client/supabaseClient';
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	export let data: PageData;
	const post = {
		error: form?.error ?? '',
		title: form?.title ?? data?.post.title,
		description: form?.description ?? data?.post.description,
		markdown: form?.markdown ?? data?.post.markdown,
		hidden: form?.hidden ?? data?.post.hidden,
		client
	};
</script>

<Editor {post} />
