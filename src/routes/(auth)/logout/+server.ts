import { redirect } from '@sveltejs/kit';

export const GET = async (event: any) => {
	const {
		locals: { supabase }
	} = event;
	await supabase.auth.signOut();
	throw redirect(303, '/');
};
