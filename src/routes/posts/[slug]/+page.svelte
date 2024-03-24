<script>
	export let data;
	let post = data.post;
</script>

<h1 class="h1 m-2">{post?.title}</h1>

<div class="m-6">
	<p>{post?.readTime} min read</p>
	<p>Created: {post?.createdAt}</p>
	<p>Edited: {post?.lastEdit}</p>
</div>

<div class="m-6">
	<p class="text-lg">
		{@html post?.content}
	</p>
</div>
