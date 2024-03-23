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
      text: "Mattermost",
      icon: "cib:mattermost",
      href: "https://matrix.to/#/@textyash:matrix.org",
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
      text: "XMPP",
      icon: "mdi:xmpp",
      href: "https://matrix.to/#/@textyash:matrix.org",
    },
    {
      text: "Youtube",
      icon: "mdi:youtube",
      href: "https://youtube.com/@textyash",
    },
  ];
</script>

<div class="grid grid-cols-7 w-auto justify-center m-2 px-4">
  {#each links as link}
    <a class="p-1 sm:p-2" target="_blank" href={link.href}>
      <Icon icon={link.icon} class="h-8 w-8" />
    </a>
  {/each}
</div>
