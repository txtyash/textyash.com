<script lang="ts">
	import { Register } from '$lib/components';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="mx-4 mt-8 flex flex-col items-center">
	{#if form?.success}
		<h3 class="h3 my-6">
			{form?.success}
		</h3>
	{:else}
		<h3 class="h3 my-6">Create a new account</h3>
		<Register {form} />
		<a class="m-3 p-3" href="/login">
			<u>Go to the Login Page</u>
		</a>
	{/if}
</div>
