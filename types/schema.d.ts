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
  key_development_milestones: Milestone[] | null;
  permit_process: string | null;
  proposed_cod: Date;
  approved: boolean;
};

export interface Option {
  title: string;
  icon: React.ReactNode;
}

export interface FilterType {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface Filters {
  statusCompleted: boolean;
  technology: string[];
  projectSize: {
    min: number;
    max: number;
  };
  location: string[];
}
export type Milestone = {
  milestoneTitle: string;
  completed: boolean;
  date: string | null;
};
