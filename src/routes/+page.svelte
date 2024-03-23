<script lang="ts">
  import { Links, Posts } from "$lib/components";
  export let data;
</script>

<div class="grid grid-cols-2 items-center m-2 p-2">
  <img
    class="mx-auto h-32 w-32 rounded-sm object-cover"
    src="/images/profile-crop.png"
    alt="Yash's profile"
  />
  <p class="flex items-center text-sm sm:text-lg">
    Hi, I’m Yash, a software developer. I love technology & music. I occasionaly
    jot down my thoughts here : )
  </p>
</div>

<Links />

<Posts posts={data.posts} />

<!-- TODO -->
<!-- post/[slug] page:  Add delete and edit page to the "Bottom Drawer" -->
<!-- Other Pages: posts/edit(editor), auth -->
<!-- Implement popups for each link. Eg: hover on Insta shows "Account Deactivated!" popup -->
<!-- Implement Pagination -->
<!-- Implement RSS -->
