<script>
	export let data;
</script>

<div class="grid sm:grid-cols-2 p-2 items-center m-4">
  <img class="mx-auto h-32 w-32 rounded-sm object-cover"
    src="" alt="Yash's profile" />
  <p class="flex items-center text-lg">Hi, I’m Yash, a software developer. I love technology & music. I occasionaly jot down
    my thoughts here : )</p>
</div>

<div class="w-full m-4">
	{#each data.posts as post}
	<a class="block card card-hover m-4 p-4" href="posts/{post.slug}">
    <p class="text-3xl">{post.title}</p>
    <p class="mt-2">{post.description}</p>
    <p class="text-right mt-2">{post.created_at}</p>
	</a>
	{/each}
</div>
