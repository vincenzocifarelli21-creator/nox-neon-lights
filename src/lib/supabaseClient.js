import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey;
};

// Export for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('Supabase Configuration:', {
    url: supabaseUrl ? '✓ Configured' : '✗ Missing VITE_SUPABASE_URL',
    key: supabaseAnonKey ? '✓ Configured' : '✗ Missing VITE_SUPABASE_ANON_KEY',
    configured: isSupabaseConfigured()
  });
}

// Additional security configurations for Supabase client
if (supabaseUrl && supabaseAnonKey) {
  // Enable RLS (Row Level Security) by default
  // This should be configured in your Supabase dashboard
  console.log('🔐 Remember to enable RLS policies in your Supabase dashboard');
}
