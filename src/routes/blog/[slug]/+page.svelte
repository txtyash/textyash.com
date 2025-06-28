<script lang="ts">
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
const metadata: BlogMetadata = data.metadata;
const content: any = data.content;
const Content = $state(content); // NOTE: Why do I need to use a rune?
let { title, date, tags, published, readingTime } = metadata;
</script>

<h1 class="text-4xl font-semibold w-full">
  {title}
</h1>
<p class="my-2">
  {#each tags as tag}
    <span class="mr-1 sm:mr-2 p-1 border-1 rounded text-xs">
      {tag}
    </span>
  {/each}
</p>
<div class="flex justify-between">
  <p class="my-2 text-violet-500 dark:text-sky-500 font-semibold">{date}</p>
  {#if readingTime}
    <p class="my-2 text-violet-500 dark:text-sky-500 font-semibold">
      {readingTime} {readingTime > 1 ? "mins" : "min"}
    </p>
  {/if}
</div>

<div class="prose dark:prose-invert !max-w-none [&_h2]:text-violet-500 [&_h2]:dark:text-sky-500">
  <Content />
</div>

<style>
:global(.prose img) {
  margin: 0 auto;
}
</style>
