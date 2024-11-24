import { useEffect, useState } from 'react';
import {
  LocationIcon,
  ProjectSizeIcon,
  StatusIcon,
  TechnologyIcon,
} from '@/assets/Dropdown-Icons/icons';
import { FilterBar } from '@/components/FilterBar';
import Map from '@/components/Map';
import { SearchBar } from '@/components/SearchBar';
import { Filters, FilterType } from '@/types/schema';
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

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    status: [],
    technology: [],
    projectSize: { min: 0, max: 0 },
    location: [],
  });
  const [filteredProjectsFromDropdowns, setFilteredProjectsFromDropdowns] =
    useState<Project[]>(projects);

  const [filteredProjectsFromSearch, setFilteredProjectsFromSearch] =
    useState<Project[]>(projects);

  // show projects based on selected filters
  const handleFilterButtonClick = () => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { status, technology, projectSize, location } = selectedFilters;
    // add all filtering logic here
    const technologyProjects = projects?.filter(project =>
      technology.includes(project.renewable_energy_technology),
    );
    setFilteredProjectsFromDropdowns(technologyProjects);
  };

  // clear filters
  const clearFilters = () => {
    setSelectedFilters({
      status: [],
      technology: [],
      projectSize: { min: 0, max: 0 },
      location: [],
    });
    setFilteredProjects(projects);
  };

  // search within all projects or filtered projects from dropdowns
  useEffect(() => {
    let projectsToSearch: Project[] = [];

    if (filteredProjectsFromDropdowns.length > 0) {
      projectsToSearch = filteredProjectsFromDropdowns;
    } else {
      projectsToSearch = projects;
    }

    const searchedProjects: Project[] =
      projectsToSearch?.filter(project =>
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ?? [];

    setFilteredProjectsFromSearch(searchedProjects);
  }, [projects, searchTerm, filteredProjectsFromDropdowns]);

  useEffect(() => {
    setFilteredProjects(filteredProjectsFromDropdowns);
  }, [filteredProjectsFromDropdowns, setFilteredProjects]);

  useEffect(() => {
    setFilteredProjects(filteredProjectsFromSearch);
  }, [filteredProjectsFromSearch, setFilteredProjects]);

  const handleFilterChange = (filter: FilterType) => {
    return;
  };

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        handleFilterButtonClick={handleFilterButtonClick}
        clearFilters={clearFilters}
      />
      <Map projects={projects} />
      <ProjectsListingModal projects={filteredProjects} />
    </>
  );
}
