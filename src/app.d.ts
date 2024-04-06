import { SupabaseClient, Session, User } from '@supabase/supabase-js';
import { Database } from './DatabaseDefinitions';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			getUser(): Promise<User | null>;
			session: Session | null;
			user: User | null;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}
