import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection
console.log('Supabase URL:', supabaseUrl);  // This should show your URL, not undefined
console.log('Testing Supabase connection...');

supabase
  .from('locations')  // Even if this table doesn't exist yet, we'll get a response
  .select('*')
  .limit(1)
  .then(response => {
    if (response.error) {
      console.error('Supabase connection error:', response.error);
    } else {
      console.log('Supabase connected successfully!');
    }
  });
