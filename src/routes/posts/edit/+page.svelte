<!-- TODO: Add an actual Markdown Editor -->
<script lang="ts">
	export let form;
</script>

<h1 class="h1 my-4">Post Editor</h1>

{#if form?.error}
	<p class="m-2 text-red-500"><b>Error:</b>{form?.error}</p>
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
			value={form?.title ?? ""}
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
			value={form?.content ?? ""}
			placeholder="Write your new post..."
		/>
	</label>

	<button type="submit" class="my-2 btn variant-filled">Post</button>
</form>
