import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://odgsveffrfpkumjyuere.supabase.co'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function queryProjects() {
  const { data: Projects, error } = await supabase
    .from('Projects')
    .select('id, project_name');

  console.log('PROJECTS', Projects, 'ERROR', error)

  return { Projects, error };
}
