<script lang="ts">
  import Icon from "@iconify/svelte";
  import {
    LightSwitch,
    type DrawerStore,
    type DrawerSettings,
  } from "@skeletonlabs/skeleton";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  export let drawerStore: DrawerStore;
  export let drawerSettings: DrawerSettings;

  // TODO: https://discord.com/channels/457912077277855764/1219289188445458483
  function goBack() {
    console.log(window.location.href);
    if (browser && $page.url.pathname != "/") {
      window.history.back();
    }
  }
</script>

<div
  class="flex items-center justify-center w-fit p-2 fixed bottom-5 z-50 left-1/2 right-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-800 rounded-xl border-2 border-stone-800 dark:border-stone-300"
>
  <button type="button" class="btn-icon mx-2" on:click={goBack}>
    <Icon icon="iconoir:page-left" class="h-7 w-7" />
  </button>
  <button
    type="button"
    class="btn-icon mx-2"
    on:click={() => drawerStore.open(drawerSettings)}
  >
    <Icon icon="solar:menu-dots-circle-broken" class="h-7 w-7" />
  </button>
  <LightSwitch class="mx-2" />
</div>
