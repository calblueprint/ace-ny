import { useEffect, useState } from 'react';
//import { useMap } from '@vis.gl/react-google-maps';
import {
  LocationIcon,
  ProjectSizeIcon,
  StatusIcon,
  TechnologyIcon,
} from '@/assets/Dropdown-Icons/icons';
import { FilterBar } from '@/components/FilterBar';
import Map from '@/components/Map';
import { Filters, FilterType } from '@/types/schema';
import { Project } from '../../types/schema';
import BottomBar from '../BottomBar';
import ProjectModal from '../ProjectModal';
import ProjectsListingModal from '../ProjectsListingModal';

function getProjectsSize(projects: Project[]) {
  return projects.map(project => project.size);
}

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
      id: 'location',
      label: 'LOCATION',
      icon: <LocationIcon />,
    },
    {
      id: 'projectSize',
      label: 'PROJECT SIZE',
      icon: <ProjectSizeIcon />,
    },
  ];

  const defaultFilters = {
    status: [],
    technology: [],
    projectSize: {
      min: Math.min(...getProjectsSize(projects)),
      max: Math.max(...getProjectsSize(projects)),
    },
    location: [],
  };

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    status: [],
    technology: [],
    projectSize: { min: 0, max: 0 },
    location: [],
  });

  const [tempFilters, setTempFilters] = useState<Filters>(defaultFilters);

  const [filteredProjectsFromDropdowns, setFilteredProjectsFromDropdowns] =
    useState<Project[]>(projects);

  const [filteredProjectsFromSearch, setFilteredProjectsFromSearch] =
    useState<Project[]>(projects);

  // clear filters
  const clearFilters = () => {
    setSelectedFilters(defaultFilters);
    setTempFilters(defaultFilters);
    setFilteredProjects(projects);
    setFilteredProjectsFromDropdowns(projects);
  };

  // show projects based on selected filters
  const handleFilterButtonClick = () => {
    setSelectedFilters(tempFilters);
  };

  useEffect(() => {
    const { status, technology, projectSize } = selectedFilters;
    let filteredProjects = projects;

    // add all filtering logic here
    if (technology.length > 0) {
      filteredProjects = filteredProjects.filter(project =>
        technology.includes(project.renewable_energy_technology),
      );
    }

    if (status.length > 0) {
      filteredProjects = filteredProjects.filter(project =>
        status.includes(project.project_status),
      );
    }

    filteredProjects = filteredProjects.filter(
      project =>
        project.size >= projectSize.min && project.size <= projectSize.max,
    );

    setFilteredProjectsFromDropdowns(filteredProjects);
  }, [selectedFilters, projects]);

  // search within all projects or filtered projects from dropdowns
  useEffect(() => {
    let projectsToSearch: Project[] = [];

    if (filteredProjectsFromDropdowns.length > 0) {
      projectsToSearch = filteredProjectsFromDropdowns;
    } else if (
      Object.values(selectedFilters).every(filter =>
        Array.isArray(filter)
          ? filter.length === 0
          : filter.min === 0 && filter.max === 0,
      )
    ) {
      // Only fallback to all projects if no filters are applied
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

  return (
    <>
      <FilterBar
        filters={filters}
        selectedFilters={tempFilters}
        setSelectedFilters={setTempFilters}
        handleFilterButtonClick={handleFilterButtonClick}
        clearFilters={clearFilters}
        projectSizes={getProjectsSize(projects)}
      />
      <Map
        projects={projects}
        filteredProjects={filteredProjects}
        map={map}
        setMap={setMap}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
      />
      <ProjectsListingModal
        projects={filteredProjects}
        map={map}
        setSelectedProjectId={setSelectedProjectId}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedProjectId={selectedProjectId}
      />
      {selectedProjectId && (
        <ProjectModal
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          project={projects.find(i => i.id === selectedProjectId)}
        />
      )}
      <BottomBar></BottomBar>
    </>
  );
}
