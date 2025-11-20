import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use the provided hardcoded credentials
const supabaseUrl = process.env.SUPABASE_URL || 'https://cesiuqdwctyjfwscfcit.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlc2l1cWR3Y3R5amZ3c2NmY2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0OTQ5NjIsImV4cCI6MjA3OTA3MDk2Mn0.hdQPex4eb968GlmiL8c0btwjE1xo5_JVlSFtFKnQB4M';

// HELPER: Check if Supabase is configured
// Returns true if keys are present.
export const isSupabaseConfigured = (): boolean => {
  return !!supabaseUrl && !!supabaseKey;
};

export const supabase = createClient(supabaseUrl, supabaseKey);