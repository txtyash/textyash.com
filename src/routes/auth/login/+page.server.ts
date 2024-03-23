import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const userData = {
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    };
    const { data, error } = await supabase.auth.signInWithPassword(userData);
    if (error) {
      return fail(401, { error: error.message });
    }
    throw redirect(303, "/");
  },
} satisfies Actions;
