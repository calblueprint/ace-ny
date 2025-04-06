'use client';

import { Project } from '../../types/schema';

export const handleSortAZ = (projects: Project[]) => {
  return projects.toSorted((a, b) =>
    a.project_name.localeCompare(b.project_name),
  );
};

export const handleSortZA = (projects: Project[]) => {
  return projects.toSorted((a, b) =>
    b.project_name.localeCompare(a.project_name),
  );
};
export const handleSortSizeAscending = (projects: Project[]) => {
  return projects.toSorted((a, b) => a.size - b.size);
};

export const handleSortSizeDescending = (projects: Project[]) => {
  return projects.toSorted((a, b) => b.size - a.size);
};
export const handleSortCODAscending = (projects: Project[]) => {
  return projects.toSorted((a, b) =>
    a.proposed_cod.toString().localeCompare(b.proposed_cod.toString()),
  );
};
export const handleSortCODDescending = (projects: Project[]) => {
  return projects.toSorted((a, b) =>
    b.proposed_cod.toString().localeCompare(a.proposed_cod.toString()),
  );
};
