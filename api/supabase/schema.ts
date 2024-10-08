export type Project = {
  id: string;
  project_name: string;
  energy_category: string;
  size: number;
  developer: string;
  longitude: number;
  latitude: number;
  project_statues: string;
  county: string;
  town: string;
  region: string;
  state_senate_district: number;
  assembly_district: number;
  project_image: string | null;
  additional_information: string | null;
  key_development_milestones: object | null;
};
