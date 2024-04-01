<script lang="ts">
	import { Drawer, type DrawerStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	export let drawerStore: DrawerStore;
	export let loggedIn: boolean;
	export let admin: boolean;
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
			drawerItems.push({
				text: 'New Post',
				icon: 'mingcute:pencil-fill',
				href: '/posts/edit'
			});
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
			<ul class="">
				{#each drawerItems as item}
					<li class="py-2">
						<a href={item.href} on:click={drawerStore.close}>
							<span class="badge bg-primary-500">
								<Icon icon={item.icon} class="h-7 w-7" />
							</span>
							<span class="flex-auto">{item.text}</span>
						</a>
					</li>
				{/each}
				<li class="py-1">
					<button type="button" on:click={drawerStore.close}>
						<span class="badge bg-primary-500">
							<Icon icon="mingcute:close-fill" class="h-7 w-7" />
						</span>
						<span class="flex-auto">Close</span>
					</button>
				</li>
			</ul>
		</nav>
	</Drawer>
</div>
