import {
  EnergyStorageIcon,
  GeothermalIcon,
  HydroelectricIcon,
  LandBasedWindIcon,
  OffshoreWindIcon,
  PumpedStorageIcon,
  SolarPvIcon,
} from '../../assets/Technology-Tag-Icons/icons';
import COLORS from '../../styles/colors';
import { TagText1 } from '../../styles/texts';
import { TechnologyTagStyles } from './styles';

export default function TechnologyTag({
  technology,
}: {
  technology: string | undefined;
}) {
  const iconMap: { [key: string]: JSX.Element } = {
    'Offshore Wind': (
      <OffshoreWindIcon fill={COLORS.electricBlue} stroke={COLORS.navy} />
    ),
    'Energy Storage': (
      <EnergyStorageIcon fill={COLORS.teal} stroke={COLORS.white} />
    ),
    Geothermal: <GeothermalIcon fill={COLORS.earthyGreen} />,
    Hydroelectric: <HydroelectricIcon fill={COLORS.frenchBlue} />,
    'Land-Based Wind': <LandBasedWindIcon fill={COLORS.skyBlue} />,
    'Pumped Storage': <PumpedStorageIcon fill={COLORS.cyanBlue} />,
    'Solar PV': <SolarPvIcon fill={COLORS.yellow} />,
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
