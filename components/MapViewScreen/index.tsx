import { FilterBar } from '@/components/FilterBar';
import Map from '@/components/Map';
import { SearchBar } from '@/components/SearchBar';
import { Filter } from '@/types/schema';
import Location from '../../assets/DropdownIcons/Location.svg';
import ProjectSize from '../../assets/DropdownIcons/ProjectSize.svg';
import Status from '../../assets/DropdownIcons/Status.svg';
import Technology from '../../assets/DropdownIcons/Technology.svg';
import { Project } from '../../types/schema';
import SVGIcon from '../SVGIcon';

export default function MapViewScreen(props: { projects: Project[] | null }) {
  const filters: Filter[] = [
    {
      id: 'status',
      label: 'STATUS',
      icon: <SVGIcon src={Status} alt="Status" />,
    },
    {
      id: 'technology',
      label: 'TECHNOLOGY',
      icon: <SVGIcon src={Technology} alt="Technology" />,
    },
    {
      id: 'projectSize',
      label: 'PROJECT SIZE',
      icon: <SVGIcon src={ProjectSize} alt="Project Size" />,
    },
    {
      id: 'location',
      label: 'LOCATION',
      icon: <SVGIcon src={Location} alt="Location" />,
    },
  ];

  const handleFilterChange = (filter: Filter) => {
    console.log(filter);
  };

  return (
    <>
      <SearchBar />
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <Map projects={props.projects} />
    </>
  );
}
