import { createClient } from '@supabase/supabase-js'

// Supabase configuration - Pre-configured with your credentials
const supabaseUrl = 'https://gsxeryxchbdhvfblgkvf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzeGVyeXhjaGJkaHZmYmxna3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNjYzNjMsImV4cCI6MjA3Mjg0MjM2M30.Ms-CChTmqwV-s-IxRjYVCPvY8Eg0T07uPgq3p_iG2rY'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
