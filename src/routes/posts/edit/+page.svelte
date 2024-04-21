<script lang="ts">
	import { Editor } from '$lib/components';
	import type { ActionData } from './$types';
	export let form: ActionData;
	const post = {
		error: form?.error ?? '',
		title: form?.title ?? '',
		description: form?.description ?? '',
		markdown: form?.markdown ?? '',
		html: form?.html ?? '',
		hidden: form?.hidden ?? false
	};
</script>

<Editor {post} />
