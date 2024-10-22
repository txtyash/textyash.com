<script lang="ts">
	import { Drawer, type DrawerStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';

	export let drawerStore: DrawerStore;
	export let loggedIn: boolean;
	export let admin: boolean;
	$: currentRoute = $page.url.pathname;
	let drawerItems = [
		{
			text: 'Home',
			icon: 'heroicons-solid:home',
			href: '/'
		},
		{
			text: 'Stuff.txt',
			icon: 'twemoji:test-tube',
			href: '/stuff'
		}
	];
	if (loggedIn) {
		drawerItems.push({
			text: 'Logout',
			icon: 'ic:baseline-waving-hand',
			href: '/logout'
		});
		if (admin) {
			drawerItems.push(
				{
					text: 'Write',
					icon: 'mingcute:pencil-fill',
					href: '/posts/edit'
				},
				{
					text: 'Tags',
					icon: 'tabler:tag-filled',
					href: '/tags'
				}
			);
		}
	} else {
		drawerItems.push({
			text: 'Login',
			icon: 'mingcute:lock-fill',
			href: '/login'
		});
		drawerItems.push({
			text: 'Register',
			icon: 'mdi:register',
			href: '/register'
		});
	}
</script>

<div>
	<Drawer class="z-50">
		<nav class="list-nav flex h-full items-center justify-center text-xl md:text-3xl">
			<ul class="flex flex-col gap-2">
				{#each drawerItems as item}
					<li
						class="variant-outline rounded-3xl text-center {item.href === currentRoute
							? '!variant-filled-primary'
							: ''}"
					>
						<a href={item.href} on:click={drawerStore.close}>
							<span class="badge bg-secondary-300">
								<Icon icon={item.icon} class="h-7 w-7" />
							</span>
							<span class="flex-auto">{item.text}</span>
						</a>
					</li>
				{/each}
				<li class="w-full py-1">
					<button
						type="button"
						class="variant-outline w-full rounded-3xl text-center"
						on:click={drawerStore.close}
					>
						<span class="badge bg-secondary-300">
							<Icon icon="mingcute:close-fill" class="h-7 w-7" />
						</span>
						<span class="flex-auto">Close</span>
					</button>
				</li>
			</ul>
		</nav>
	</Drawer>
</div>
