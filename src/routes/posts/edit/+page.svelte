<script lang="ts">
	import { Editor } from '$lib/components';
	export let form;
	const post = {
		error: form?.error ?? '',
		title: form?.title ?? '',
		content: form?.content ?? '',
		hidden: form?.hidden ?? false
	};
</script>

<Editor {post} />
