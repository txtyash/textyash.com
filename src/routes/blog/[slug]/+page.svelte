<script lang="ts">
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
const metadata: BlogMetadata = data.metadata;
const content: any = data.content;
const Content = $state(content); // NOTE: Why do I need to use a rune?
const { title, date, tags, published } = metadata;

// TODO: Calculate reading time
</script>

<h1 class="text-4xl text-violet-500 dark:text-teal-500 font-semibold font-serif w-full">
  {title}
</h1>
<span>{date}</span>
<p>
  {#each tags as tag}
    <span>{tag}</span>
  {/each}
</p>

<div class="prose dark:prose-invert !max-w-none">
  <Content />
</div>
