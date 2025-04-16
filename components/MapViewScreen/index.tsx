import { useEffect, useState } from 'react';
//import { useMap } from '@vis.gl/react-google-maps';
import {
  LocationIcon,
  LocationIconApplied,
  ProjectSizeIcon,
  ProjectSizeIconApplied,
  StatusIcon,
  StatusIconApplied,
  TechnologyIcon,
  TechnologyIconApplied,
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

const locationCategoryKeyMap: Record<string, keyof Project> = {
  Region: 'region',
  County: 'county',
  Town: 'town',
  'State Senate District': 'state_senate_district',
  'Assembly District': 'assembly_district',
  'Utility Service Territory': 'utility',
};

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
      iconApplied: <StatusIconApplied />,
    },
    {
      id: 'technology',
      label: 'TECHNOLOGY',
      icon: <TechnologyIcon />,
      iconApplied: <TechnologyIconApplied />,
    },
    {
      id: 'location',
      label: 'LOCATION',
      icon: <LocationIcon />,
      iconApplied: <LocationIconApplied />,
    },
    {
      id: 'projectSize',
      label: 'PROJECT SIZE',
      icon: <ProjectSizeIcon />,
      iconApplied: <ProjectSizeIconApplied />,
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

  const [
    filteredProjectsFromDropdownNoSize,
    setFilteredProjectsFromDropdownNoSize,
  ] = useState<Project[]>(projects);

  const [filteredProjectsFromSearch, setFilteredProjectsFromSearch] =
    useState<Project[]>(projects);

  const clearFilters = (filterName?: keyof Filters) => {
    if (filterName) {
      // Clear specific filter
      setSelectedFilters(prev => ({
        ...prev,
        [filterName]: defaultFilters[filterName],
      }));
      setTempFilters(prev => ({
        ...prev,
        [filterName]: defaultFilters[filterName],
      }));
    } else {
      // Clear all filters if no argument is passed
      setSelectedFilters(defaultFilters);
      setTempFilters(defaultFilters);
      setFilteredProjects(projects);
      setFilteredProjectsFromDropdowns(projects);
    }
  };
  const [projectSizes, setProjectSizes] = useState<number[]>(
    getProjectsSize(projects),
  );

  // show projects based on selected filters
  const handleFilterButtonClick = () => {
    setSelectedFilters(tempFilters);
  };

  const [activeLocationCategory, setActiveLocationCategory] = useState<
    string | null
  >(null);

  useEffect(() => {
    const { status, technology, projectSize, location } = selectedFilters;
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

    if (location.length > 0 && activeLocationCategory) {
      const key = locationCategoryKeyMap[activeLocationCategory];

      if (key) {
        filteredProjects = filteredProjects.filter(project => {
          const value = String(project[key]);
          if (activeLocationCategory === 'County') {
            return location.map(l => l.replace(' County', '')).includes(value);
          }
          if (
            activeLocationCategory === 'State Senate District' ||
            activeLocationCategory === 'Assembly District'
          ) {
            return location
              .map(l => parseInt(l.split(' ').at(-1) || ''))
              .includes(Number(value));
          }
          if (activeLocationCategory === 'Utility Service Territory') {
            const utilityShortNamesMap: Record<string, string> = {
              'National Grid': 'NGRID',
              'Rochester Gas and Electric': 'RGE',
              'NYS Electric and Gas': 'NYSEG',
              'Central Hudson Gas and Electric': 'CHGE',
              'Orange and Rockland Utilities': 'ORU',
              'Long Island Power Authority': 'LIPA',
              'Consolidated Edison': 'ConEd',
              Municipal: 'Municipal',
            };

            return location
              .map(name => utilityShortNamesMap[name])
              .includes(value);
          }
          return location.includes(value);
        });
      }
    }

    setFilteredProjectsFromDropdownNoSize(filteredProjects);

    filteredProjects = filteredProjects.filter(
      project =>
        project.size >= projectSize.min && project.size <= projectSize.max,
    );

    setFilteredProjectsFromDropdowns(filteredProjects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, searchTerm, filteredProjectsFromDropdowns]);

  useEffect(() => {
    setFilteredProjects(filteredProjectsFromDropdowns);
    setProjectSizes(getProjectsSize(filteredProjectsFromDropdownNoSize));
  }, [
    filteredProjectsFromDropdowns,
    filteredProjectsFromDropdownNoSize,
    setFilteredProjects,
  ]);

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
        setActiveLocationCategory={setActiveLocationCategory}
        projectSizes={projectSizes}
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
      <BottomBar projects={filteredProjects}></BottomBar>
    </>
  );
}
