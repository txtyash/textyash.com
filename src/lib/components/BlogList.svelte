<script lang="ts">
export let blogs: Blog[];
export let isForHomePage: boolean = false;
const LENGTH_FOR_HOMEPAGE: number = 6; // Max list length for home page
</script>

{#each isForHomePage ? blogs.slice(0, LENGTH_FOR_HOMEPAGE) : blogs as blog}
  <div class="w-full my-3 sm:my-6 p-2 sm:p-4 rounded-2xl bg-violet-500/5 dark:bg-sky-500/3 border-b-8 border-teal-500/0 hover:dark:border-teal-500/7 hover:border-violet-500/20">
    <a href="blog/{blog.slug}">
      <p class="text-violet-500 dark:text-sky-500 font-semibold text-xl sm:text-3xl">
        {blog.title}
      </p>
      <p class="text-md sm:text-lg font-normal">{blog.description}</p>
      <p class="text-right text-violet-500 dark:text-sky-500 font-semibold text-sm sm:text-xl">
        {blog.date}
      </p>
    </a>
  </div>
{/each}
{#if blogs.length > LENGTH_FOR_HOMEPAGE && isForHomePage}
  <a
    href="/blog"
    class="text-center block w-full my-3 sm:my-6 p-2 sm:p-4 rounded-2xl bg-violet-500/5 dark:bg-sky-500/3 border-b-8 border-teal-500/0 hover:dark:border-teal-500/7 hover:border-violet-500/20 text-violet-500 dark:text-sky-500 font-semibold text-lg sm:text-xl"
  >
    See all blogs
  </a>
{/if}
