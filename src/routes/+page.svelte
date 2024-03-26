<script lang="ts">
  import { Links, Posts } from "$lib/components";
  export let data;
  let showPosts = true;
</script>

<div class="grid grid-cols-2 items-center m-2 p-2">
  <img
    class="mx-auto h-32 w-32 rounded-xl object-cover"
    src="/images/profile-crop.png"
    alt="Yash's profile"
  />
  <p class="flex items-center text-sm sm:text-lg">
    Hi, I’m Yash, a software developer. I love technology & music. I occasionaly
    jot down my thoughts here : )
  </p>
</div>

<div class="flex w-auto justify-center m-2 px-4">
  <button
    type="button"
    on:click={() => (showPosts = !showPosts)}
    class="btn variant-filled"
  >
    {showPosts ? "Show Links" : "Show Posts"}
  </button>
</div>

<div class="m-2">
  {#if showPosts}
    {#if !data?.posts}
      <p class="my-12 text-center">Yash hasn't posted anything yet.</p>
    {:else}
      <Posts posts={data.posts} />
    {/if}
  {:else}
    <Links />
  {/if}
</div>
