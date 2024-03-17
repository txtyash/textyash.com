<script lang="ts">
  import "../app.postcss";
  import {
    AppShell,
    Drawer,
    LightSwitch,
    getDrawerStore,
    initializeStores,
    type DrawerSettings,
  } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";

  initializeStores();

  const drawerStore = getDrawerStore();
  const drawerSettings: DrawerSettings = {
    position: "bottom",
    meta: { foo: "bar", fizz: "buzz", age: 40 },
  };
  let drawerItems = [
    {
      text: "Home",
      icon: "fluent-emoji-flat:house",
      href: "/",
    },
    {
      text: "Stuff",
      icon: "twemoji:winking-face",
      href: "/stuff",
    },
  ];
  let loggedIn = true;
  let root = false;
  if (loggedIn) {
    drawerItems.push({
      text: "Logout",
      icon: "twemoji:waving-hand",
      href: "/auth/logout",
    });
    if (root) {
      drawerItems.push({
        text: "New Post",
        icon: "noto:pencil",
        href: "/posts/edit",
      });
    }
  } else {
    drawerItems.push({
      text: "Login",
      icon: "twemoji:locked",
      href: "/auth/login",
    });
  }

  // TODO: https://discord.com/channels/457912077277855764/1219289188445458483
  function goBack() {
    console.log(window.location.href);
    if (browser && $page.url.pathname != "/") {
      window.history.back();
    }
  }
</script>

<!-- App Shell -->
<AppShell>
  <!-- Page Route Content -->
  <div
    class="mx-auto w-11/12 sm:w-10/12 md:w-9/12 lg:w-7/12 lg:max-w-screen-md pb-24"
  >
    <slot />
  </div>
  <!-- Floating Bottom Menu Bar -->
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
  <!-- Drawer Bottom -->
  <Drawer class="z-50">
    <nav
      class="list-nav h-full flex justify-center items-center text-xl md:text-3xl"
    >
      <ul class="">
        {#each drawerItems as item}
          <li class="py-2">
            <a href={item.href} on:click={drawerStore.close}>
              <span class="badge bg-primary-500">
                <Icon icon={item.icon} class="h-7 w-7" />
              </span>
              <span class="flex-auto">{item.text}</span>
            </a>
          </li>
        {/each}
        <li class="py-1">
          <button type="button" on:click={drawerStore.close}>
            <span class="badge bg-primary-500">
              <Icon icon="mingcute:close-fill" class="h-7 w-7" />
            </span>
            <span class="flex-auto">Close</span>
          </button>
        </li>
      </ul>
    </nav>
  </Drawer>
</AppShell>
