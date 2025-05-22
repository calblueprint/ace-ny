import { Project } from '../../../types/schema';
import supabase from '../createClient';

const tableMap: Record<string, string> = {
  County: 'Counties Test',
  Region: 'Regions Test',
  'Utility Service Territory': 'Utility Service Territories Test',
  'State Senate District': 'State Senate Districts Test',
  'Assembly District': 'Assembly Districts Test',
  Town: 'Towns Test',
};

const columnMap: Record<string, string> = {
  County: 'county',
  Region: 'region',
  'Utility Service Territory': 'utility_service_territories',
  'State Senate District': 'state_senate_district',
  'Assembly District': 'assembly_district',
  Town: 'town',
};

export default async function queryProjects(): Promise<Project[]> {
  const { data: projects, error } = await supabase
    .from('Projects')
    .select('*')
    .not('longitude', 'is', null)
    .not('latitude', 'is', null);
  // .eq('approved', true);

  if (error) {
    throw new Error(`Error fetching projects: ${error.message}`);
  }

  return projects;
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

export async function queryNamesForCategory(category: string) {
  const tableName = tableMap[category];
  const columnName = columnMap[category];

  if (!tableName || !columnName) {
    return [];
  }

  const { data, error } = await supabase.from(tableName).select(columnName);

  if (error) {
    console.error(`Error fetching names from ${category}:`, error.message);
    return [];
  }

  return data.map(row => Object.values(row)[0]);
}

export async function queryCoordsForName(category: string, name: string) {
  const tableName = tableMap[category];
  const columnName = columnMap[category];

  if (!tableName || !columnName) {
    return [];
  }

  const { data, error } = await supabase
    .from(tableName)
    .select('coordinates')
    .eq(columnName, name);

  if (error) {
    console.error(
      `Error fetching coordinates from ${category}:`,
      error.message,
    );
    return [];
  }

  if (!data[0]) {
    return [];
  }

  const json_data = JSON.parse(data[0]['coordinates']);
  return json_data;
}
