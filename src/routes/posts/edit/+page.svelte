<script lang="ts">
	import { Editor } from '$lib/components';
	import type { ActionData } from './$types';
	export let form: ActionData;
	const post = {
		error: form?.error ?? '',
		title: form?.title ?? '',
		content: form?.content ?? '',
		hidden: form?.hidden ?? false
	};
</script>

<Editor {post} />
