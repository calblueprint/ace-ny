import { Project } from '../../../types/schema';
import supabase from '../createClient';

export default async function queryProjects() {
  const { data: projects, error } = await supabase
    .from('Projects')
    .select('*')
    .eq('approved', true);

  console.log('PROJECTS', projects, 'ERROR', error);

  return { projects, error };
}

export async function queryProjectbyId(id: number): Promise<Project> {
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

export async function queryDefaultImages(category: string) {
  console.log('Fetching default image for category:', category);
  const { data: defaultImage, error } = await supabase
    .from('Renewable Energy Technology')
    .select('*')
    .eq('category', 'category')
    .single();

  if (error) {
    throw new Error(`Error fetching default image: ${error.message}`);
  }

  return defaultImage;
}
