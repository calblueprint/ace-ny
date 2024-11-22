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
  const [filteredWithoutSearch, setFilteredWithoutSearch] =
    useState<Project[]>(projects);

  // show projects based on selected filters
  const handleFilterButtonClick = () => {
    const { status, technology, projectSize, location } = selectedFilters;
    console.log(
      'status: ',
      status,
      'technology: ',
      technology,
      'projectSize: ',
      projectSize,
      'location: ',
      location,
    );
    const filteredProjects = projects?.filter(project =>
      technology.includes(project.renewable_energy_technology),
    );
    setFilteredProjects(filteredProjects);
    setFilteredWithoutSearch(filteredProjects);
  };

  // search within filtered projects
  useEffect(() => {
    const searchedProjects =
      filteredWithoutSearch?.filter(project =>
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ?? [];
    setFilteredProjects(searchedProjects);
  }, [searchTerm, filteredWithoutSearch, setFilteredProjects]);

  const handleFilterChange = (filter: FilterType) => {
    console.log(filter);
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
      />
      <Map projects={filteredProjects} />
      <ProjectsListingModal projects={filteredProjects} />
    </>
  );
}
