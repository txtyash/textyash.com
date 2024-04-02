import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			/**
			 * Note: You have to add the `path` variable to the
			 * set and remove method due to sveltekit's cookie API
			 * requiring this to be set, setting the path to an empty string
			 * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
			 */
			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: '/' });
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: '/' });
			}
		}
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	event.locals.getUser = async () => {
		const {
			data: { user }
		} = await event.locals.supabase.auth.getUser();
		return user;
	};

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `await locals.getSession()`
	 * you just call `locals.session`
	 */
	event.locals.session = await event.locals.getSession();

	event.locals.user = await event.locals.getUser();

	// If authenticated then redirect from login & register to homepage
	if (
		(event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) &&
		event.locals.session
	) {
		throw redirect(303, '/');
	}

	// Protecting Admin routes
	const adminRoutes = ['/posts/edit', '/posts/delete'];
	// check if the current route is only supposed to be accessed by the admin
	const isAdminRoute = adminRoutes.some((route) => event.url.pathname.startsWith(route));
	if (isAdminRoute) {
		// Check if the user is admin using their email
		if (event.locals.user?.email !== 'shinde27yash@gmail.com') {
			throw redirect(303, '/login');
		}
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
