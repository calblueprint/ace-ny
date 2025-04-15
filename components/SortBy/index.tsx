'use client';

import { SortByText } from '@/styles/texts';
import { Project } from '../../types/schema';
import { SortByItem } from './styles';

export default function SortBy({
  projects,
  category,
  setSortedProjects,
  toggleSortBy,
  setSortCategory,
}: {
  projects: Project[] | null;
  category: string;
  setSortedProjects: (projects: Project[] | null) => void;
  toggleSortBy: () => void;
  setSortCategory: (category: string) => void;
}) {
  let filteredProjects: Project[] | null;

  if (projects) {
    switch (category) {
      case 'Name A-Z':
        filteredProjects = projects.toSorted((a, b) =>
          a.project_name.localeCompare(b.project_name),
        );
        break;
      case 'Name Z-A':
        filteredProjects = projects.toSorted((a, b) =>
          b.project_name.localeCompare(a.project_name),
        );
        break;
      case 'Size Ascending':
        filteredProjects = projects.toSorted((a, b) => a.size - b.size);
        break;
      case 'Size Descending':
        filteredProjects = projects.toSorted((a, b) => b.size - a.size);
        break;
      case 'COD Ascending':
        filteredProjects = projects.toSorted((a, b) =>
          a.proposed_cod.toString().localeCompare(b.proposed_cod.toString()),
        );
        break;
      case 'COD Descending':
        filteredProjects = projects.toSorted((a, b) =>
          b.proposed_cod.toString().localeCompare(a.proposed_cod.toString()),
        );
        break;
    }
  }

  return (
    <SortByItem
      onClick={() => {
        setSortedProjects(filteredProjects);
        setSortCategory(category);
        toggleSortBy();
      }}
    >
      <SortByText>{category}</SortByText>
    </SortByItem>
  );
}
