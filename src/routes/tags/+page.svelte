<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data;
	export let form;

	let editingId: number | undefined = undefined;
	let deletingId: number | undefined = undefined;
	let loading: boolean = false;
</script>

{#if loading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<ProgressRadial class="w-9" />
	</div>
{/if}

<div class="container mx-auto my-4 sm:w-3/4">
	<form
		method="post"
		action="?/create"
		use:enhance={() => {
			loading = true;

			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		<div class="flex gap-2">
			<input
				class="autocomplete input"
				type="text"
				name="name"
				autocomplete="off"
				placeholder="New tag name..."
			/>
			<button type="submit" disabled={loading} class="variant-soft btn"> Add Tag </button>
		</div>
	</form>
	{#if form?.error}
		<div class="mx-auto w-full text-center">
			<small class="text-red-500">{form?.error}</small>
		</div>
	{/if}

	<div class="table-container my-4 overflow-x-auto">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Posts</th>
					<th>Created</th>
				</tr>
			</thead>
			<tbody>
				{#each data?.allTags as row (row.id)}
					<tr>
						<td>{row.id}</td>
						<td>
							<div class="flex items-center space-x-2 whitespace-nowrap">
								<form
									method="post"
									action="?/update"
									class="flex items-center space-x-2"
									use:enhance={() => {
										editingId = undefined;
										deletingId = undefined;
										loading = true;

										return async ({ update }) => {
											await update();
											loading = false;
										};
									}}
								>
									<input type="hidden" name="id" value={row.id} />
									<input
										class="input min-w-[120px]"
										type="text"
										name="name"
										value={row.name}
										disabled={editingId !== row.id}
									/>
									{#if editingId == row.id}
										<button type="submit" disabled={loading} class="variant-soft btn-icon shrink-0">
											<Icon icon="mingcute:check-fill" />
										</button>
									{:else}
										<button
											class="variant-soft btn-icon shrink-0"
											disabled={loading}
											on:click={() => {
												editingId = row.id;
												deletingId = undefined;
											}}
										>
											<Icon icon="mingcute:pencil-fill" />
										</button>
									{/if}
								</form>
								<form
									method="post"
									action="?/delete"
									class="shrink-0"
									use:enhance={() => {
										loading = true;

										return async ({ update }) => {
											await update();
											loading = false;
										};
									}}
								>
									<input type="hidden" name="id" value={row.id} />
									{#if deletingId == row.id}
										<button type="submit" disabled={loading} class="variant-soft btn-icon">
											<Icon icon="mingcute:check-fill" />
										</button>
									{:else}
										<button
											type="button"
											disabled={loading}
											class="variant-soft btn-icon"
											on:click={() => {
												deletingId = row.id;
												editingId = undefined;
											}}
										>
											<Icon icon="ic:baseline-delete" />
										</button>
									{/if}
								</form>
							</div>
						</td>
						<td>{row.posts}</td>
						<td>{row.createdAt}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="3">Total Tags</th>
					<td>{data.allTags.length}</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
