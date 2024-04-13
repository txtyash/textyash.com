<script lang="ts">
	export let src: string;
	export let alt: string;
</script>

<div class="flex items-center justify-center">
	<img class="my-4 h-96 w-full rounded-lg object-cover" {src} {alt} />
</div>
