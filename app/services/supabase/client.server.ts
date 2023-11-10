import { createClient } from '@supabase/supabase-js';

import type { Database } from './table.server';

const supabaseUrl = 'https://dfrrijclhftnvrzawagb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcnJpamNsaGZ0bnZyemF3YWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4Njc2NjUsImV4cCI6MjAxMjQ0MzY2NX0.ZjNhPhXtB9JE-cya3WJeCqMEeauLxQbHlDIuwHYl7e0';

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'x-my-custom-header': 'remix-movie',
    },
  },
};

const supabase = createClient<Database>(supabaseUrl, supabaseKey, options);

export default supabase;
