<script lang="ts">
	import { imageBlob } from '$lib/components';
	import { client } from '$lib/client';

	export let fileName: string = '';

	let imageInput: HTMLInputElement;
	let uploading: boolean = false;
	let deleting: boolean = false;

	// Uploads image to supabase storage
	const uploadCoverImage = async (blob: Blob) => {
		uploading = true;
		if (!fileName) throw new Error('Specify a file name.');

		const { error } = await client.storage.from('cover-images').upload(`${fileName}.jpeg`, blob, {
			contentType: 'image/jpeg',
			upsert: true
		});
		if (error) throw error;
		imageBlob.set(blob);
		uploading = false;
	};

	// Update blob on change
	async function onChange() {
		// file is an instance of "Blob"
		let file: File | null = imageInput.files![0];
		if (file.size > 1500000) {
			alert('Image size should be less than 1.5MB');
			return;
		}
		if (file.size > 0) await uploadCoverImage(file);
	}

	async function deleteImage() {
		deleting = true;
		const { error } = await client.storage.from('cover-images').remove([`${fileName}.jpeg`]);
		if (!error) imageBlob.set(null);
		deleting = false;
	}
</script>

<input
	id="files"
	class="hidden"
	bind:this={imageInput}
	on:change={onChange}
	type="file"
	accept="image/jpeg"
	disabled={uploading}
/>
{#if $imageBlob === null}
	<label for="files" class="variant-filled btn {uploading ? 'opacity-50' : ''}">
		{#if uploading}
			Uploading...
		{:else}
			Add Image
		{/if}
	</label>
{:else}
	<button on:click={deleteImage} disabled={deleting} class="variant-filled btn">
		{#if deleting}
			Deleting...
		{:else}
			Delete Image
		{/if}
	</button>
{/if}
