import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Graceful fallback warning if they forgot to add the key
  console.warn("⚠️ Supabase environment variables missing. Please ensure your .env file is properly configured with VITE_SUPABASE_ANON_KEY.");
}

export const supabase = createClient(
  supabaseUrl || "https://zismufxsoutioywrxqnj.supabase.co", 
  supabaseAnonKey || "dummy_key_to_prevent_crash"
);
