import type { LayoutServerLoad } from './$types';
import { ADMIN_EMAIL } from '$env/static/private';

export const load: LayoutServerLoad = async ({ locals: { session } }) => {
	let isAdmin = session?.user.email === ADMIN_EMAIL;
	let isLoggedIn = session !== null;
	return {
		isAdmin,
		isLoggedIn
	};
};
