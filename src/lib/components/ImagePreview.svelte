<script lang="ts">
	import { imageB64, imageBlob } from '$lib/components';
	import { onMount } from 'svelte';

	let imagePreview: HTMLImageElement;

	onMount(async () => {
		imageBlob.subscribe(async (blob) => {
			const reader = new FileReader();
			reader.addEventListener('load', function () {
				if (reader.result !== null) {
					let dataURL = String(reader.result);
					imageB64.set(dataURL.replace('data:', '').replace(/^.+,/, ''));
					imagePreview.setAttribute('src', String(dataURL));
				}
			});
			// Below line triggers the above listener
			if (blob !== null) reader.readAsDataURL(blob);
		});
	});
</script>

{#if $imageBlob !== null}
	<div class="flex items-center justify-center">
		<img
			class="my-4 h-96 w-full rounded-lg object-cover"
			bind:this={imagePreview}
			src=""
			alt="Preview"
		/>
	</div>
{/if}
