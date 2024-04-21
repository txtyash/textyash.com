<script lang="ts">
	import Icon from '@iconify/svelte';
	import { LightSwitch, type DrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	export let drawerStore: DrawerStore;
	export let drawerSettings: DrawerSettings;

	function goBack() {
		if (browser && $page.url.pathname != '/') {
			window.history.back();
		}
	}
</script>

<div
	class="fixed bottom-5 left-1/2 right-1/2 z-50 flex w-fit -translate-x-1/2 transform items-center justify-center rounded-xl border-2 border-stone-800 bg-gray-200 p-2 dark:border-stone-300 dark:bg-gray-800"
>
	<button type="button" class="btn-icon mx-2" on:click={goBack}>
		<Icon icon="iconoir:page-left" class="h-7 w-7" />
	</button>
	<button type="button" class="btn-icon mx-2" on:click={() => drawerStore.open(drawerSettings)}>
		<Icon icon="solar:menu-dots-circle-broken" class="h-7 w-7" />
	</button>
	<LightSwitch class="mx-2" />
</div>
