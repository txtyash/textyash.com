import { checkEmail } from '$lib/formChecker';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		const emailError = checkEmail(email);
		if (emailError) {
			return fail(422, { email, error: emailError });
		}

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			return fail(422, { email, error: error.message });
		}
		throw redirect(303, '/');
	}
} satisfies Actions;
