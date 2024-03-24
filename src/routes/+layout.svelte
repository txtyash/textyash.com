<script lang="ts">
  export let data;
  // TODO: Check & invalidate user session
  import "../app.postcss";
  import { MenuBar, Drawer } from "$lib/components";
  import {
    getDrawerStore,
    AppShell,
    type DrawerSettings,
    initializeStores,
  } from "@skeletonlabs/skeleton";

  initializeStores();

  const drawerStore = getDrawerStore();

  const drawerSettings: DrawerSettings = {
    position: "bottom",
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
  <div
    class="mx-auto w-11/12 sm:w-10/12 md:w-9/12 lg:w-7/12 lg:max-w-screen-md mb-24"
  >
    <!-- Content goes in this slot -->
    <slot />
  </div>
  <!-- Floating Bottom Menu Bar -->
  <MenuBar {drawerStore} {drawerSettings} />
  <!-- Bottom Drawer  -->
  <Drawer
    admin={data?.session?.user.email === "shinde27yash@gmail.com"}
    loggedIn={data?.session !== null}
    {drawerStore}
  />
</AppShell>
