<script lang="ts">
	import { imageB64, imageExt } from '$lib/components';
	import ImagePreview from '$lib/components/ImagePreview.svelte';
	import ImageUpload from '$lib/components/ImageUpload.svelte';
</script>

<h1 class="h1">Component Playground</h1>

<div class="my-4">
	<h2 class="h2">Image Upload/Preview</h2>

	<ImageUpload />

	<ImagePreview />

	<p>image extension: {$imageExt}</p>
	<p>B64 string length: {$imageB64?.length}</p>
</div>
<hr />
