import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'No Supabase environment variables detected, please make sure they are in place!',
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
