<script lang="ts">
	import { imageBlob } from '$lib/components';
	import { client } from '$lib/client';
	import { onMount } from 'svelte';

	export let fileName: string = '';

	onMount(async () => {
		imageBlob.set(null);
		const { data, error } = await client.storage.from('cover-images').download(`${fileName}.jpeg`);

		if (error) {
			throw error;
		}
		imageBlob.set(data);
	});

	function preview(node: HTMLImageElement, blob: Blob) {
		function update(blob: Blob) {
			URL.revokeObjectURL(node.src);
			const url = URL.createObjectURL(blob);
			node.src = url;
		}

		function destroy() {
			URL.revokeObjectURL(node.src);
		}

		update(blob);

		return { update, destroy };
	}
</script>

{#if $imageBlob}
	<div class="flex items-center justify-center">
		<img
			class="my-4 h-96 w-full rounded-lg object-cover"
			use:preview={$imageBlob}
			src=""
			alt="Preview"
		/>
	</div>
{/if}
