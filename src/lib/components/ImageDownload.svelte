<script lang="ts">
	import CoverImage from '$lib/components/CoverImage.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	export let client: SupabaseClient;
	export let imagePath: string | null;
</script>

{#await client.storage.from('cover-images').download(imagePath ?? '')}
	<CoverImage src="/images/default-cover-image.png" alt="Cover" />
{:then { data }}
	{#if data}
		<CoverImage src={URL.createObjectURL(data)} alt={imagePath ?? 'Cover'} />
	{/if}
{/await}
