import React from 'react';

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
  key_development_milestones: Milestone[];
  permit_process: string | null;
  proposed_cod: Date;
  approved: boolean;
  interconnection_number: string | null;
  permit_process: string | null;
  permit_application_number: string | null;
  last_updated: Date;
  utility: string | null;
  last_updated_display: Date;
  has_energy_storage: boolean;
  has_pumped_storage: boolean;
  storage_size: number | null;
  project_website_link: string | null;
  economic_benefits: string | null;
};

export interface Option {
  title: string;
  icon: React.ReactNode;
}

export type ProjectSizeType = {
  min: number;
  max: number;
};

export interface Filters {
  status: string[];
  technology: string[];
  projectSize: ProjectSizeType;
  location: string[];
}

export interface FilterType {
  id: keyof Filters;
  label: string;
  icon: React.ReactNode;
  iconApplied: React.ReactNode;
}

export type Milestone = {
  milestoneTitle: string;
  completed: boolean;
  date: string | null;
};

type FilterHandlerArgs = {
  [K in keyof Filters]: Filters[K];
};

export type FilterChangeHandlers = {
  [K in keyof FilterHandlerArgs]: (args: FilterHandlerArgs[K]) => void;
};
