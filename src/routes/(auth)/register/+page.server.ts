import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { checkEmail, checkPassword, confirmPassword } from '$lib/formChecker';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const confirm = formData.get('confirmPassword')?.toString() ?? '';

		const emailError = checkEmail(email);
		console.log(emailError);
		if (emailError) {
			return fail(422, { email, error: emailError });
		}

		const passwordError = checkPassword(password);
		if (passwordError) {
			return fail(422, { email, error: passwordError });
		}

		const confirmError = confirmPassword(password, confirm);
		if (confirmError) {
			return fail(422, { email, error: confirmError });
		}

		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			return fail(500, { email, error: error.message });
		}
		return {
			success: 'Please check your email to confirm your account creation.'
		};
	}
} satisfies Actions;
