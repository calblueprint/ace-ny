'use client';

import { SortByText } from '@/styles/texts';
import { Project } from '../../types/schema';
import { SortByItem } from './styles';

export default function SortBy({
  projects,
  category,
  setSortedProjects,
  toggleSortBy,
}: {
  projects: Project[] | null;
  category: string;
  setSortedProjects: React.Dispatch<React.SetStateAction<Project[] | []>>;
  toggleSortBy: () => void;
}) {
  let sortedProjects: Project[] | [];

  if (projects) {
    switch (category) {
      case 'Name A-Z':
        sortedProjects = projects.toSorted((a, b) =>
          a.project_name?.localeCompare(b.project_name),
        );
        break;
      case 'Name Z-A':
        sortedProjects = projects.toSorted((a, b) =>
          b.project_name?.localeCompare(a.project_name),
        );
        break;
      case 'Size Ascending':
        sortedProjects = projects.toSorted((a, b) => a.size - b.size);
        break;
      case 'Size Descending':
        sortedProjects = projects.toSorted((a, b) => b.size - a.size);
        break;
      case 'COD Ascending':
        sortedProjects = projects.toSorted(
          (a, b) =>
            new Date(a.proposed_cod)?.getTime() -
            new Date(b.proposed_cod)?.getTime(),
        );
        break;
      case 'COD Descending':
        sortedProjects = projects.toSorted(
          (a, b) =>
            new Date(b.proposed_cod)?.getTime() -
            new Date(a.proposed_cod)?.getTime(),
        );
        break;
    }
  }

  return (
    <SortByItem
      onClick={() => {
        setSortedProjects(sortedProjects);
        toggleSortBy();
      }}
    >
      <SortByText>{category}</SortByText>
    </SortByItem>
  );
}
