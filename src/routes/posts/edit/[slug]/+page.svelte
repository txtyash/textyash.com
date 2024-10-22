<script lang="ts">
	import { Editor } from '$lib/components';
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	export let data: PageData;
	let post = {
		error: form?.error ?? '',
		markdown: form?.markdown ?? data?.post.markdown,
		visible: form?.visible ?? data?.post.visible,
		restricted: form?.restricted ?? data?.post.restricted
	};
</script>

<Editor bind:post />
