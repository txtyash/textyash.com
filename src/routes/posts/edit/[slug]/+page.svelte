<script lang="ts">
  import { Editor } from "$lib/components";
  import type { ActionData, PageData } from "./$types";
  export let form: ActionData;
  export let data: PageData;
  const post = {
    title: data?.post.title,
    content: data?.post.content,
  };
</script>

<h1 class="h1 my-4">Post Editor</h1>
<Editor {form} {post} />
