import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://odgsveffrfpkumjyuere.supabase.co'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function queryProjects() {
  const { data: projects, error } = await supabase.from('Projects').select('*');

  console.log('PROJECTS', projects, 'ERROR', error);

  return { projects, error };
}
