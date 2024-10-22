<script lang="ts">
	import { enhance } from '$app/forms';
	import { parse } from '$lib/client';
	import Icon from '@iconify/svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

	export let allTags: any; // { value: number; label: string }[]

	export let post: {
		error: string;
		markdown: string;
		visible: boolean;
		restricted: boolean;
		tags: string; // comma separated string of ids
	};

	let preview = false;
	let tags: { id: number; name: string }[] = [];

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
	let popupInput: string = '';
	let loading: boolean = false;

	const autocompleteOptions: AutocompleteOption<string>[] = allTags;

	function onTagSelect(event: CustomEvent<AutocompleteOption<string>>) {
		const index: number = tags.findIndex((element) => element.id === Number(event.detail.value));
		if (index === -1) tags.push({ id: Number(event.detail.value), name: event.detail.label });
		tags = tags; // trigger reactivity
		post.tags = JSON.stringify(tags.map((tag) => tag.id));
	}

	function removeTag(id: number) {
		console.log('removing tag', tags);
		const index: number = tags.findIndex((element) => element.id === id);
		if (index !== -1) tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
		tags = tags;
		post.tags = JSON.stringify(tags.map((tag) => tag.id));
	}
</script>

{#if loading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<ProgressRadial class="w-9" />
	</div>
{/if}

<div class="container my-4">
	<!-- Post Preview -->
	{#if preview}
		<!-- Start Parsing the Post -->
		<div class="my-2">
			{#await parse(post.markdown)}
				<div class="flex h-screen items-center justify-center">
					<ProgressRadial class="w-9" />
				</div>
			{:then parsed}
				<button type="button" class="variant-soft btn" on:click={() => (preview = false)}>
					Edit
				</button>
				<hr class="my-4" />
				<div class="prose my-6 max-w-none dark:prose-invert">
					{@html parsed}
				</div>
			{:catch error}
				<p class="text-red-500">Failed to parse post</p>
				{#if error}
					<pre>{error}</pre>
				{/if}
			{/await}
		</div>
		<!-- Post Editor -->
	{:else}
		<form
			method="POST"
			id="blogpost"
			class="my-2"
			use:enhance={() => {
				loading = true;

				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
		>
			<div class="grid grid-cols-2 items-center justify-items-start gap-4 sm:grid-cols-4">
				<div>
					<button
						type="button"
						on:click={() => (preview = true)}
						class="variant-soft btn col-span-2 sm:col-auto"
					>
						Preview
					</button>
				</div>
				<SlideToggle name="visible" bind:checked={post.visible}>
					{post.visible ? 'Visible' : 'Hidden'}
				</SlideToggle>
				<div>
					<input
						class="autocomplete input"
						type="search"
						name="autocomplete-search"
						bind:value={popupInput}
						placeholder="Search tags..."
						use:popup={popupSettings}
					/>
					<div
						data-popup="popupAutocomplete"
						class="card max-h-48 w-full max-w-sm overflow-y-auto p-4"
					>
						<!-- TODO: Background opacity -->
						<Autocomplete
							bind:input={popupInput}
							options={autocompleteOptions}
							on:selection={onTagSelect}
						/>
					</div>
				</div>
				<SlideToggle name="restricted" bind:checked={post.restricted}>
					{post.restricted ? 'Restricted' : 'Unrestricted'}
				</SlideToggle>
			</div>

			<input type="hidden" name="tags" bind:value={post.tags} />

			{#if tags.length > 0}
				<div class="flex overflow-x-auto p-1">
					{#each tags as tag (tag.id)}
						<button class="variant-soft chip m-1" on:click={() => removeTag(tag.id)}>
							{tag.name}
							<!-- <Icon icon="mingcute:check-fill" class="h-7 w-7" /> -->
							<Icon icon="basil:cross-outline" width="21" />
						</button>
					{/each}
				</div>
			{/if}

			<!-- Markdown Editor -->
			<!-- TODO: Syntax Highlight, Update minlength -->
			<textarea
				required
				minlength="1"
				class="textarea my-2"
				name="markdown"
				rows="28"
				bind:value={post.markdown}
				placeholder="Write your new post..."
			/>

			{#if post.error}
				<p class="my-2 text-red-500">{post.error}</p>
			{/if}

			<!-- TODO: Why is this form attribute needed? -->
			<button type="submit" form="blogpost" class="variant-filled btn my-2">Post</button>
		</form>
	{/if}
</div>
