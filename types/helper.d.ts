export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type Merge<T, U> = Prettify<T & U>;

export type Project = {
  id: string;
  project_name: string;
  developer: string;
  renewable_energy_technology: string;
  size: number;
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
  key_development_milestones: object | null;
  proposed_cod: string | null;
  zipcode: string | null;
  approved: boolean;
};
