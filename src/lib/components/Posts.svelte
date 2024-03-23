<script lang="ts">
  interface Post {
    title: string;
    slug: string;
    description: string;
    read_time: string;
    created_at: string;
  }
  export let posts: Post[];
</script>

<div class="w-full">
  {#each posts as post}
    <a class="block card card-hover my-4 p-4" href="posts/{post.slug}">
      <p class="line-clamp-2 font-semibold text-md sm:text-xl">
        {post.title}
      </p>
      <p class="line-clamp-2 sm:line-clamp-3">
        {post.description}
      </p>
      <div class="grid grid-cols-2 py-1">
        <p>{post.read_time} min read</p>
        <p class="text-right font-normal sm:font-semibold">{post.created_at}</p>
      </div>
    </a>
  {/each}
</div>
