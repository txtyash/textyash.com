<script lang="ts">
	import { imageB64, imageBlob, imageExt } from '$lib/components';
	import { onMount } from 'svelte';

	export const blob: Blob | null = null;

	let imageInput: HTMLInputElement;

	onMount(async () => {
		imageBlob.subscribe(async (blob) => {
			const reader = new FileReader();
			reader.addEventListener('load', function () {
				if (reader.result !== null) {
					let dataURL = String(reader.result);
					imageB64.set(dataURL.replace('data:', '').replace(/^.+,/, ''));
				}
			});
			// Below line triggers the above listener
			if (blob !== null) reader.readAsDataURL(blob);
		});
	});

	async function onChange() {
		// file is an instance of "Blob"
		let file: File | null = imageInput.files![0];
		imageBlob.set(file);
		imageExt.set(file?.name?.split('.').pop() ?? null);
	}
</script>

<div>
	{#if $imageBlob === null}
		<label for="files" class="variant-filled btn">Select Image</label>
	{:else}
		<button
			on:click={async () => {
				imageBlob.set(null);
				imageB64.set(null);
				imageExt.set(null);
			}}
			class="variant-filled btn"
		>
			Remove Image
		</button>
	{/if}
	<input
		id="files"
		class="hidden"
		bind:this={imageInput}
		on:change={onChange}
		type="file"
		accept="image/*"
	/>
</div>
