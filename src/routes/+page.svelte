<script lang="ts">
  import { LightSwitch } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  let loggedIn = true;
  let root = true;
  let data = {
    posts: [
      {
        title: '"Dune" Movie Review',
        slug: "dune",
        description:
          'Upon revisiting "Dune" in preparation for enjoying "Dune 2" even more, I found myself once again captivated by its intricate storytelling and mesmerizing visuals.',
        created_at: "Mar 17, 2024",
      },
      {
        title: 'Getting started with "Just" Command Runner',
        slug: "just",
        description:
          "Just is a command runner that simplifies running frequently used commands during project development. We will do a simple just setup and become productive right away.",
        created_at: "Feb 17, 2024",
      },
      {
        title: "Problems using a Rust backend with a Svelte frontend",
        slug: "rust",
        description:
          "I recently switched from an axum backend for this website to a sveltekit backend.Here's why I did it & probably why you should too.",
        created_at: "Jan 5, 2024",
      },
    ],
  };
</script>

<div class="grid sm:grid-cols-2 items-center m-2 p-2">
  <img
    class="mx-auto h-32 w-32 rounded-sm object-cover"
    src="/images/profile.jpeg"
    alt="Yash's profile"
  />
  <p class="flex items-center text-lg">
    Hi, I’m Yash, a software developer. I love technology & music. I occasionaly
    jot down my thoughts here : )
  </p>
</div>

<div class="flex w-auto justify-center m-2 p-2">
  <a class="mx-3.5" target="_blank" href="https://github.com/txtyash"
    ><Icon icon="mdi:github" class="h-7 w-7" /></a
  >
  <a class="mx-3.5" target="_blank" href="https://instagram.com/textyash"
    ><Icon icon="mdi:instagram" class="h-7 w-7" /></a
  >
  <a class="mx-3.5" target="_blank" href="https://twitter.com/textyash"
    ><Icon icon="mdi:twitter" class="h-7 w-7" /></a
  >
  <a
    class="mx-3.5"
    target="_blank"
    href="https://linkedin.com/in/yash-shinde-1a306929b"
    ><Icon icon="mdi:linkedin" class="h-7 w-7" /></a
  >
  <a class="mx-3.5" target="_blank" href="https://reddit.com/u/textyash"
    ><Icon icon="mdi:reddit" class="h-7 w-7" /></a
  >
  <a class="mx-3.5" target="_blank" href="mailto:textyash@proton.me"
    ><Icon icon="mdi:email" class="h-7 w-7" /></a
  >
  <!-- TODO: Implement RSS -->
  <a class="mx-3.5" href="/"><Icon icon="mdi:rss" class="h-7 w-7" /></a>
</div>

<div class="flex w-auto justify-center m-2 p-2">
  <a class="btn btn-sm variant-ghost-surface mx-3.5" href="secret">Secret</a>
  {#if loggedIn}
    <a class="btn btn-sm variant-ghost-surface mx-3.5" href="/auth/logout"
      >Logout</a
    >
    {#if root}
      <a class="btn btn-sm variant-ghost-surface mx-3.5" href="posts/edit"
        >New Post</a
      >
    {/if}
  {:else}
    <a class="btn btn-sm variant-ghost-surface mx-3.5" href="/auth/login"
      >Login</a
    >
  {/if}
  <LightSwitch class="mx-3.5" />
</div>

<div class="w-full m-4">
  {#each data.posts as post}
    <a class="block card card-hover m-4 p-4" href="posts/{post.slug}">
      <p class="text-3xl font-semibold">{post.title}</p>
      <p class="p-2">{post.description}</p>
      <p class="text-right font-semibold">{post.created_at}</p>
    </a>
  {/each}
</div>
