<!-- TODO: Add an actual Markdown Editor -->
<h1 class="h1 my-4">Post Editor</h1>

<form method="POST">
	<label class="label">
		<span>Title</span>
		<input class="input" type="text" name="title" placeholder="Input" />
	</label>

	<label class="label">
		<span>Description</span>
		<textarea name="description" class="textarea" rows="4" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
	</label>
								
	<label class="label">
		<span>Content</span>
		<textarea class="textarea" rows="14" name="content" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
	</label>

	<button type="submit" class="btn variant-filled">Submit</button>
</form>
