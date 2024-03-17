<script lang="ts">
  import Icon from "@iconify/svelte";
  let loggedIn = true;
  let root = false;
  let links = [
    {
      text: "LinkedIn",
      icon: "mdi:linkedin",
      href: "https://linkedin.com/in/yash-shinde-1a306929b",
    },
    {
      text: "Twitter",
      icon: "mdi:twitter",
      href: "https://twitter.com/textyash",
    },
    {
      text: "Github",
      icon: "mdi:github",
      href: "https://github.com/txtyash",
    },
    {
      text: "Instagram",
      icon: "mdi:instagram",
      href: "https://instagram.com/textyash",
    },
    {
      text: "Reddit",
      icon: "mdi:reddit",
      href: "https://reddit.com/u/textyash",
    },
    {
      text: "Email",
      icon: "mdi:email",
      href: "mailto:textyash@proton.me",
    },
    {
      text: "RSS",
      icon: "mdi:rss",
      href: "/",
    },
  ];
  let data = {
    posts: [
      {
        title: '"Dune" Movie Review',
        slug: "dune",
        description:
          'Upon revisiting "Dune" in preparation for enjoying "Dune 2" even more, I found myself once again captivated by its intricate storytelling and mesmerizing visuals.',
        created_at: "Mar 17, 2024",
        read_time: 15,
      },
      {
        title: 'Getting started with "Just" Command Runner',
        slug: "just",
        description:
          "Just is a command runner that simplifies running frequently used commands during project development. We will do a simple just setup and become productive right away.",
        created_at: "Feb 17, 2024",
        read_time: 15,
      },
      {
        title: "Problems using a Rust backend with a Svelte frontend",
        slug: "rust",
        description:
          "I recently switched from an axum backend for this website to a sveltekit backend.Here's why I did it & probably why you should too.",
        created_at: "Jan 5, 2024",
        read_time: 15,
      },
      {
        title: "Problems using a Rust backend with a Svelte frontend",
        slug: "rust",
        description:
          "I recently switched from an axum backend for this website to a sveltekit backend.Here's why I did it & probably why you should too.",
        created_at: "Jan 5, 2024",
        read_time: 15,
      },
      {
        title: "Problems using a Rust backend with a Svelte frontend",
        slug: "rust",
        description:
          "I recently switched from an axum backend for this website to a sveltekit backend.Here's why I did it & probably why you should too.",
        created_at: "Jan 5, 2024",
        read_time: 15,
      },
    ],
  };
</script>

<div class="grid grid-cols-2 items-center m-2 p-2">
  <img
    class="mx-auto h-32 w-32 rounded-sm object-cover"
    src="/images/profile.jpeg"
    alt="Yash's profile"
  />
  <p class="flex items-center text-sm sm:text-lg">
    Hi, I’m Yash, a software developer. I love technology & music. I occasionaly
    jot down my thoughts here : )
  </p>
</div>

<div class="flex w-auto justify-center m-2 p-2">
  {#each links as link}
    <a class="mx-2" target="_blank" href={link.href}>
      <Icon icon={link.icon} class="h-8 w-8" />
    </a>
  {/each}
</div>

<div class="w-full">
  {#each data.posts as post}
    <a class="block card card-hover my-4 p-4" href="posts/{post.slug}">
      <p class="line-clamp-2 font-semibold text-md sm:text-xl">
        {post.title}
      </p>
      <p class="line-clamp-2 sm:line-clamp-3 font-light sm:font-normal">
        {post.description}
      </p>
      <div
        class="grid grid-cols-{loggedIn && root
          ? 4
          : 2} py-1 font-light sm:font-normal"
      >
        <p>{post.read_time} min read</p>
        {#if loggedIn && root}
          <a href="/posts/edit/{post.slug}">
            <Icon icon="mdi:pencil" class="h-5 w-5" />
          </a>
          <a href="/posts/delete/{post.slug}">
            <Icon icon="material-symbols-light:delete" class="h-5 w-5" />
          </a>
        {/if}
        <p class="text-right font-normal sm:font-semibold">{post.created_at}</p>
      </div>
    </a>
  {/each}
</div>

<!-- TODO -->
<!-- post/[slug] page:  Add delete and edit page to the "Bottom Drawer" -->
<!-- Other Pages: posts/edit(editor), auth -->
<!-- Implement popups for each link. Eg: hover on Insta shows "Account Deactivated!" popup -->
<!-- Implement Pagination -->
<!-- Implement RSS -->
<!-- 
        <a href="/posts/edit/{post.slug}">
          <Icon icon="mdi:pencil" class="h-6 w-6" />
        </a>
        <button type="button" class="btn-icon mx-2">
          <Icon icon="mdi:trash" class="h-6 w-6" />
        </button>
-->
