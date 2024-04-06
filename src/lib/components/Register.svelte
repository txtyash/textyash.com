<script lang="ts">
	import type { ActionData } from '../../routes/$types';
	import Icon from '@iconify/svelte';
	export let form: ActionData;
</script>

<form method="POST" class="card h-fit rounded-xl px-9 py-3">
	<label class="label my-3">
		<span><b>Email</b></span>
		<input
			required
			value={form?.email ?? ''}
			class="input my-3"
			title="Input (email)"
			type="email"
			name="email"
			placeholder="name@example.com"
			autocomplete="email"
		/>
	</label>
	<label class="label my-3">
		<span><b>Password</b></span>
		<input
			required
			title="Input (password)"
			class="input my-3"
			name="password"
			type="password"
			placeholder="Strong@Password129"
		/>
	</label>
	<label class="label my-3">
		<span><b>Confirm Password</b></span>
		<input
			name="confirmPassword"
			type="password"
			required
			placeholder="repeat password"
			class="input my-3"
		/>
	</label>
	{#if form?.error}
		<small class="text-red-500"><b>Error:</b> {form?.error}</small>
	{/if}
	<!-- Separator -->
	<div />
	<button type="submit" class="variant-filled btn my-3">
		<span>
			<Icon icon="mingcute:check-fill" class="h-7 w-7" />
		</span>
		<span>Register</span>
	</button>
</form>
