import { Project } from '../../../types/schema';
import supabase from '../createClient';

export default async function queryProjects(): Promise<Project[]> {
  const { data: projects, error } = await supabase
    .from('Projects_user_testing')
    .select('*')
    .eq('approved', true);

  if (error) {
    throw new Error(`Error fetching projects: ${error.message}`);
  }

  return projects;
}

export async function queryProjectbyId(id: number): Promise<Project> {
  const { data: project, error } = await supabase
    .from('Projects_user_testing')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Error fetching project: ${error.message}`);
  }

  return project;
}

export async function queryDefaultImages(category: string) {
  const { data: defaultImage, error } = await supabase
    .from('Renewable Energy Technology')
    .select('*')
    .eq('category', category)
    .single();

  if (error) {
    throw new Error(`Error fetching default image: ${error.message}`);
  }

  return defaultImage;
}

export async function queryOptionsForCategory(category: string) {
  const tableMap: Record<string, string> = {
    County: 'Counties',
    Region: 'Regions',
    'Utility Service Territory': 'Utility Service Territories',
    'State Senate District': 'State Senate Districts',
    'Assembly District': 'Assembly Districts',
    Town: 'Towns',
  };

  const tableName = tableMap[category];

  if (!tableName) {
    return [];
  }

  const { data, error } = await supabase.from(tableName).select('*');

  if (error) {
    console.error(`Error fetching ${category}:`, error.message);
    return [];
  }

  return data.map(row => Object.values(row)[1]); // gets column of values associated for the option
}
