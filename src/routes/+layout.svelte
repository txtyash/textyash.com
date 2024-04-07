<script lang="ts">
	export let data;
	import '../app.postcss';
	import { MenuBar, Drawer } from '$lib/components';
	import {
		getDrawerStore,
		AppShell,
		type DrawerSettings,
		initializeStores
	} from '@skeletonlabs/skeleton';

	initializeStores();

	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		position: 'bottom'
	};
</script>

<svelte:head>
	<title>textYash</title>
	<meta name="darkreader-lock" />
	<link rel="icon" href="/icons/favicon.svg" />
</svelte:head>

<!-- App Shell -->
<AppShell>
	<!-- Page Route Content -->
	<div class="mx-2 mb-24 sm:mx-auto sm:w-10/12 lg:max-w-screen-lg">
		<!-- Content goes in this slot -->
		<slot />
	</div>
	<!-- Floating Bottom Menu Bar -->
	<MenuBar {drawerStore} {drawerSettings} />
	<!-- Bottom Drawer  -->
	<Drawer
		admin={data?.session?.user.email === 'shinde27yash@gmail.com'}
		loggedIn={data?.session !== null}
		{drawerStore}
	/>
</AppShell>
