import supabase from '../createClient';

export default async function queryProjects() {
  const { data: projects, error } = await supabase
    .from('Projects')
    .select('*')
    .eq('approved', true);

  console.log('PROJECTS', projects, 'ERROR', error);

  return { projects, error };
}
