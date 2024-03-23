<script lang="ts">
  import Icon from "@iconify/svelte";
  let links = [
    {
      text: "Email",
      icon: "mdi:email",
      href: "mailto:textyash@proton.me",
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
      text: "LinkedIn",
      icon: "mdi:linkedin",
      href: "https://linkedin.com/in/yash-shinde-1a306929b",
    },
    {
      text: "Matrix",
      icon: "cib:matrix",
      href: "https://matrix.to/#/@textyash:matrix.org",
    },
    {
      text: "Pinterest",
      icon: "mdi:pinterest",
      href: "https://www.pinterest.com/textyash",
    },
    {
      text: "Reddit",
      icon: "mdi:reddit",
      href: "https://reddit.com/u/textyash",
    },
    {
      text: "Spotify",
      icon: "mdi:spotify",
      href: "https://open.spotify.com/user/hfymfjfnvun2cmll1iu1xmafz",
    },
    {
      text: "RSS",
      icon: "mdi:rss",
      href: "/",
    },
    {
      text: "Twitch",
      icon: "mdi:twitch",
      href: "https://twitch.tv/textyash",
    },
    {
      text: "Twitter",
      icon: "prime:twitter",
      href: "https://twitter.com/textyash",
    },
    {
      text: "Youtube",
      icon: "mdi:youtube",
      href: "https://youtube.com/@textyash",
    },
  ];
  let content = {
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

<div class="grid grid-cols-6 sm:flex w-auto justify-center m-2">
  {#each links as link}
    <a class="p-1 sm:p-2" target="_blank" href={link.href}>
      <Icon icon={link.icon} class="h-8 w-8" />
    </a>
  {/each}
</div>
