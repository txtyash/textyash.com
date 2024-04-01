<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { ActionData } from '../../routes/$types';
	export let form: ActionData;
</script>

<form method="post" class="card h-fit rounded-xl px-9 py-3">
	<label class="label my-3">
		<span><b>Email</b></span>
		<input
			value={form?.email ?? ''}
			class="input"
			name="email"
			type="text"
			placeholder="john@mail.com"
			required
		/>
	</label>
	<label class="label my-3">
		<span><b>Password</b></span>
		<input
			required
			title="Input (password)"
			class="input"
			name="password"
			type="password"
			placeholder="Strong@Password129"
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
		<span>Login</span>
	</button>
</form>
