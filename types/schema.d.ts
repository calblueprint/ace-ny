export type Project = {
  id: number;
  project_name: string;
  renewable_energy_technology: string;
  size: number;
  developer: string;
  longitude: number;
  latitude: number;
  project_status: string;
  county: string;
  town: string;
  region: string;
  state_senate_district: number;
  assembly_district: number;
  project_image: string | null;
  additional_information: string | null;
  key_development_milestones: Milestone[] | null;
  permit_process: string | null;
  proposed_cod: Date;
  approved: boolean;
};

export type Milestone = {
  milestoneTitle: string;
  completed: boolean;
  date: string | null;
};
