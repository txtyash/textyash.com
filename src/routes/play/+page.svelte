<script lang="ts">
	import ImagePreview from '$lib/components/ImagePreview.svelte';
	import ImageUpload from '$lib/components/ImageUpload.svelte';
</script>

<h1 class="h1">Component Playground</h1>

<div class="my-4">
	<h2 class="h2 py-2">Image Upload</h2>
	<ImageUpload fileName="something" />
</div>

<hr />

<div class="my-4 py-2">
	<h2 class="h2">Image Preview</h2>
	<ImagePreview />
</div>
