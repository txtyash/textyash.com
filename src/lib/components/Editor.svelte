<script lang="ts">
  import type { ActionData } from "../../routes/$types";
  export let form: ActionData;
  export let post: { title: string; content: string } = {
    title: "",
    content: String.raw`
<!-- Introduction -->
<br>
<img src="url" alt="" >
<br>
<br>
<h2 class="h2">Paragraph</h2>
<br>
<p>
</p>
<br>
<br>
<h2 class="h2">Paragraph</h2>
<br>
<p>
</p>
<br>
<br>
<h2 class="h2">Paragraph</h2>
<br>
<p>
</p>
  `,
  };
</script>

{#if form?.error}
  <p class="m-2 text-red-500"><b>Error:</b> {form?.error}</p>
{/if}

<form method="POST">
  <label class="label my-2">
    <span class="text-xl">Title</span>
    <input
      minlength="12"
      maxlength="64"
      class="input"
      type="text"
      name="title"
      value={form?.title ?? post?.title}
      placeholder="Post Title"
    />
  </label>

  <label class="label my-2">
    <span class="text-xl">Content</span>
    <textarea
      minlength="1000"
      class="textarea"
      rows="24"
      name="content"
      value={form?.content ?? post?.content}
      placeholder="Write your new post..."
    />
  </label>

  <button type="submit" class="my-2 btn variant-filled">Post</button>
</form>
