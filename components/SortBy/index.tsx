'use client';

import { SortByText } from '@/styles/texts';
import { Project } from '../../types/schema';
import { SortByItem } from './styles';

export default function SortBy({
  projects,
  category,
  setSortedProjects,
}: {
  projects: Project[] | null;
  category: string;
  setSortedProjects: (projects: Project[] | null) => void;
}) {
  const handleSortAZ = (projects: Project[]) => {
    setSortedProjects(
      projects.toSorted((a, b) => a.project_name.localeCompare(b.project_name)),
    );
  };

  const handleSortZA = (projects: Project[]) => {
    setSortedProjects(
      projects.toSorted((a, b) => b.project_name.localeCompare(a.project_name)),
    );
  };
  const handleSortSizeAscending = (projects: Project[]) => {
    setSortedProjects(projects.toSorted((a, b) => a.size - b.size));
  };

  const handleSortSizeDescending = (projects: Project[]) => {
    setSortedProjects(projects.toSorted((a, b) => b.size - a.size));
  };
  const handleSortCODAscending = (projects: Project[]) => {
    setSortedProjects(
      projects.toSorted((a, b) =>
        a.proposed_cod.toString().localeCompare(b.proposed_cod.toString()),
      ),
    );
  };
  const handleSortCODDescending = (projects: Project[]) => {
    setSortedProjects(
      projects.toSorted((a, b) =>
        b.proposed_cod.toString().localeCompare(a.proposed_cod.toString()),
      ),
    );
  };

  let sortByHandler: (projects: Project[]) => void;

  switch (category) {
    case 'Name A-Z':
      sortByHandler = handleSortAZ;
      break;
    case 'Name Z-A':
      sortByHandler = handleSortZA;
      break;
    case 'Size Ascending':
      sortByHandler = handleSortSizeAscending;
      break;
    case 'Size Descending':
      sortByHandler = handleSortSizeDescending;
      break;
    case 'COD Ascending':
      sortByHandler = handleSortCODAscending;
      break;
    case 'COD Descending':
      sortByHandler = handleSortCODDescending;
      break;
  }

  return (
    <SortByItem onClick={() => projects && sortByHandler(projects)}>
      <SortByText>{category}</SortByText>
    </SortByItem>
  );
}
