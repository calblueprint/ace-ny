import {
  EnergyStorageIcon,
  GeothermalIcon,
  HydroelectricIcon,
  LandBasedWindIcon,
  OffshoreWindIcon,
  PumpedStorageIcon,
  SolarPvIcon,
} from '../../assets/Technology-Tag-Icons/icons';
import { TagText1 } from '../../styles/texts';
import { TechnologyTagStyles } from './styles';

export default function TechnologyTag({
  technology,
}: {
  technology: string | undefined;
}) {
  const iconMap: { [key: string]: JSX.Element } = {
    'Solar PV': <SolarPvIcon />,
    Geothermal: <GeothermalIcon />,
    'Offshore Wind': <OffshoreWindIcon />,
    Hydroelectric: <HydroelectricIcon />,
    'Land-Based Wind': <LandBasedWindIcon />,
    'Pumped Storage': <PumpedStorageIcon />,
    'Energy Storage': <EnergyStorageIcon />,
  };

  const icon = technology ? iconMap[technology] : null;

  return (
    <div>
      {icon && (
        <TechnologyTagStyles>
          {icon} <TagText1>{technology}</TagText1>
        </TechnologyTagStyles>
      )}
    </div>
  );
}
