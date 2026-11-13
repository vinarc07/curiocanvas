const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && anonKey);
export const SUPABASE_ANON_KEY = anonKey ?? '';
export const STUDENT_API_URL = supabaseUrl ? `${supabaseUrl}/functions/v1/student-api` : '';
