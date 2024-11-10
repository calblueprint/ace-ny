import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaBolt } from 'react-icons/fa6';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdLightbulbOutline } from 'react-icons/md';
import { FilterBar } from '@/components/FilterBar';
import Map from '@/components/Map';
import { SearchBar } from '@/components/SearchBar';
import SVGIcon from '@/components/SVGIcon';
import { Filter } from '@/types/schema';
import EnergyStorage from '../../assets/DropdownIcons/EnergyStorage.svg';
import Geothermal from '../../assets/DropdownIcons/Geothermal.svg';
import Hydroelectric from '../../assets/DropdownIcons/Hydroelectric.svg';
import LandbasedWind from '../../assets/DropdownIcons/LandbasedWind.svg';
import OffshoreWind from '../../assets/DropdownIcons/OffshoreWind.svg';
import PumpedStorage from '../../assets/DropdownIcons/PumpedStorage.svg';
import SolarPower from '../../assets/DropdownIcons/SolarPower.svg';
import { Project } from '../../types/schema';

export default function MapViewScreen(props: { projects: Project[] | null }) {
  const filters: Filter[] = [
    {
      id: 'status',
      label: 'STATUS',
      icon: <IoIosCheckmarkCircleOutline />,
      categories: [],
    },
    {
      id: 'technology',
      label: 'TECHNOLOGY',
      icon: <FaBolt />,
      categories: [
        {
          category: 'Source',
          options: [
            {
              title: 'Land-based Wind',
              icon: <SVGIcon src={LandbasedWind} alt="Land-based Wind" />,
            },
            {
              title: 'Hydroelectric',
              icon: <SVGIcon src={Hydroelectric} alt="Hydroelectric" />,
            },
            {
              title: 'Offshore Wind',
              icon: <SVGIcon src={OffshoreWind} alt="Offshore Wind" />,
            },
            {
              title: 'Solar Power',
              icon: <SVGIcon src={SolarPower} alt="Solar Power" />,
            },
            {
              title: 'Geothermal',
              icon: <SVGIcon src={Geothermal} alt="Geothermal" />,
            },
          ],
        },
        {
          category: 'Storage',
          options: [
            {
              title: 'Energy Storage',
              icon: <SVGIcon src={EnergyStorage} alt="Energy Storage" />,
            },
            {
              title: 'Pumped Storage',
              icon: <SVGIcon src={PumpedStorage} alt="Pumped Storage" />,
            },
          ],
        },
      ],
    },
    {
      id: 'projectSize',
      label: 'PROJECT SIZE',
      icon: <MdLightbulbOutline />,
      categories: [],
    },
    {
      id: 'location',
      label: 'LOCATION',
      icon: <FaMapMarkerAlt />,
      categories: [],
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
