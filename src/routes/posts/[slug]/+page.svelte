<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	export let data;
	let post = data.post;
	async function deletePost() {
		console.log('invoked!');
		const response = await fetch('/posts/delete/' + post.slug, {
			method: 'DELETE'
		});
		let { deleted } = await response.json();
		console.log(deleted);
		if (deleted) goto('/');
	}
</script>

<div transition:fade|global>
	<h1 class="h1 m-2">{post?.title}</h1>

	<div class="m-6">
		<p><i>Last Edited:</i> {post?.lastEdit}</p>
		{#if data?.session?.user.email === 'shinde27yash@gmail.com'}
			<div class="my-4 flex items-center justify-around">
				<button on:click={deletePost}><u>DELETE</u></button>
				<a href="/posts/edit/{post?.slug}"><u>EDIT</u></a>
			</div>
		{/if}
	</div>

	<div class="m-2">
		<p>
			{@html post?.content}
		</p>
	</div>
</div>
