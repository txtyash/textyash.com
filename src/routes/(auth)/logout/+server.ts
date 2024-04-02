import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const {
		locals: { supabase }
	} = event;
	await supabase.auth.signOut();
	throw redirect(303, '/');
};
