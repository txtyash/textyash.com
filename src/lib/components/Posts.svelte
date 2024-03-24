<script lang="ts">
  export let posts: {
    slug: string;
    title: string;
    content: string;
    readTime: number;
    createdAt: string;
    lastEdit: string;
  }[];
</script>

<div class="w-full">
  {#each posts as post}
    <a class="block card card-hover my-4 p-4" href="posts/{post.slug}">
      <p class="line-clamp-2 font-semibold text-md sm:text-xl">
        {post?.title}
      </p>
      <p class="line-clamp-2 sm:line-clamp-3">
        {post?.content}
      </p>
      <div class="grid grid-cols-2 py-1">
        <p>{post?.readTime} min read</p>
        <p class="text-right font-normal sm:font-semibold">{post?.createdAt}</p>
      </div>
    </a>
  {/each}
</div>
