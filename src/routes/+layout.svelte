<!-- TODO: Audio Effects -->
<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';

	let { children } = $props();

	let links: Map<string, string> = new Map([
		['home', '/'],
		['blog', '/blog'],
		['work', '/work'],
		['socials', '/socials'],
		['stories', '/stories']
	]);
</script>

<header class="flex w-full max-w-3xl justify-between p-2">
	<div id="navigation">
		{#each [...links] as [key, val]}
			<a
				href={val}
				class="p-1 sm:text-lg font-semibold {val === page.url.pathname ? 'underline' : ''}"
				>{key}</a
			>
		{/each}
	</div>
	<div id="rss-and-theme">
		<button id="rss-btn" class="p-1 sm:text-lg sm:font-semibold"> RSS </button>
		<button id="theme-btn" class="p-1 sm:text-lg sm:font-semibold"> Theme </button>
	</div>
</header>

<!-- Child page content goes in this slot -->
<div class="max-w-3xl px-2 py-2 sm:py-8">
	{@render children()}
</div>

<!-- TODO -->
<footer></footer>

<!-- TODO: media query for width-->
<style>
</style>
