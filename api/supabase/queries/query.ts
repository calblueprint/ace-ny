import supabase from '../createClient';
import { Project } from '../../../types/schema';

export async function queryProjects() {
  const { data: projects, error } = await supabase.from('Projects').select('*');

  console.log('PROJECTS', projects, 'ERROR', error);

  return { projects, error };
}

export async function querySpecificProject(id: number): Promise<Project> {
  const { data: project, error } = await supabase
    .from('Projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Error fetching project: ${error.message}`);
  }

  return project;
}
