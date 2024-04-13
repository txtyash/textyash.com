<script lang="ts">
	import { Editor } from '$lib/components';
	import { client } from '$lib/client/supabaseClient';
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	export let data: PageData;
	const post = {
		error: form?.error ?? '',
		title: form?.title ?? data?.post.title,
		content: form?.content ?? data?.post.content,
		hidden: form?.hidden ?? data?.post.hidden,
		client,
		imagePath: data?.post.imagePath ?? ''
	};
	console.log(post.imagePath);
</script>

<Editor {post} />
