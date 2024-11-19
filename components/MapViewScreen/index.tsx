import {
  LocationIcon,
  ProjectSizeIcon,
  StatusIcon,
  TechnologyIcon,
} from '@/assets/Dropdown-Icons/icons';
import { FilterBar } from '@/components/FilterBar';
import Map from '@/components/Map';
import { SearchBar } from '@/components/SearchBar';
import { FilterType } from '@/types/schema';
import { Project } from '../../types/schema';
import ProjectsListingModal from '../ProjectsListingModal';

export default function MapViewScreen({
  projects,
  filteredProjects,
  setFilteredProjects,
}: {
  projects: Project[];
  filteredProjects: Project[];
  setFilteredProjects: React.Dispatch<React.SetStateAction<Project[] | []>>;
}) {
  const filters: FilterType[] = [
    {
      id: 'status',
      label: 'STATUS',
      icon: <StatusIcon />,
    },
    {
      id: 'technology',
      label: 'TECHNOLOGY',
      icon: <TechnologyIcon />,
    },
    {
      id: 'projectSize',
      label: 'PROJECT SIZE',
      icon: <ProjectSizeIcon />,
    },
    {
      id: 'location',
      label: 'LOCATION',
      icon: <LocationIcon />,
    },
  ];

  const handleFilterChange = (filter: FilterType) => {
    console.log(filter);
  };

  return (
    <>
      <SearchBar
        allProjects={projects}
        setFilteredProjects={setFilteredProjects}
      />
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        filteredProjects={filteredProjects}
        setFilteredProjects={setFilteredProjects}
      />
      <Map projects={projects} />
      <ProjectsListingModal projects={filteredProjects} />
    </>
  );
}
