<!-- TODO: Audio Effects -->
<script lang="ts">
import { onMount } from "svelte";
import "../app.css";
import { page } from "$app/state";
import ThemeToggle from "$lib/components/ThemeToggle.svelte";

let { children } = $props();

let links: Map<string, string> = new Map([
  ["home", "/"],
  ["blog", "/blog"],
  ["work", "/work"],
  ["socials", "/socials"],
  ["stories", "/stories"],
]);

const parentPath = $derived(page.url.pathname.split("/").at(1));

// Dark mode management: <https://tailwindcss.com/docs/dark-mode>
// The user's OS preference will be used to set the theme initially
onMount(() => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  }
});
</script>

<header class="rounded-lg flex w-full max-w-3xl justify-between p-2 sticky top-0 bg-gray-50/30 dark:bg-gray-950/30 backdrop-blur-md">
  <div id="navigation">
    {#each [...links] as [page, path]}
      <a
        href={path}
        class="mx-1 rounded-md text-violet-500 hover:text-gray-50 hover:bg-violet-500 dark:text-teal-500 dark:hover:bg-teal-500 dark:hover:text-gray-950 p-1 font-semibold sm:text-lg {path === `/${parentPath}` ? 'underline decoration-wavy' : ''}"
      >{page}</a>
    {/each}
  </div>
  <div id="rss-and-theme">
    <button id="rss-btn" class="p-1 sm:text-lg sm:font-semibold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5 21q-.825 0-1.412-.587T3 19t.588-1.412T5 17t1.413.588T7 19t-.587 1.413T5 21m13.5 0q-.65 0-1.088-.475T16.9 19.4q-.275-2.425-1.312-4.537T12.9 11.1T9.138 8.413T4.6 7.1q-.65-.075-1.125-.512T3 5.5t.45-1.062t1.075-.363q3.075.275 5.763 1.563t4.737 3.337t3.338 4.738t1.562 5.762q.05.625-.363 1.075T18.5 21m-6 0q-.625 0-1.075-.437T10.85 19.5q-.225-1.225-.787-2.262T8.65 15.35t-1.888-1.412T4.5 13.15q-.625-.125-1.062-.575T3 11.5q0-.65.45-1.075t1.075-.325q1.825.25 3.413 1.063t2.837 2.062t2.063 2.838t1.062 3.412q.1.625-.325 1.075T12.5 21"
        />
      </svg>
    </button>
    <ThemeToggle />
  </div>
</header>

<div class="max-w-3xl px-2 py-2 sm:py-8 w-full">
  {@render children()}
</div>

<!-- TODO -->
<footer></footer>
