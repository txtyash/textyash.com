<script lang="ts">
	import { Editor } from '$lib/components';
	import type { ActionData } from './$types';

	export let form: ActionData;
	export let data;

	let post = {
		error: form?.error ?? '',
		markdown: form?.markdown ?? '',
		visible: form?.visible ?? false,
		restricted: form?.restricted ?? false,
		tags: form?.tags ?? '[]'
	};
</script>

<Editor bind:post allTags={data.allTags} />
