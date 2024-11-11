import React from 'react';
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
    Geothermal: (
      <GeothermalIcon fill={COLORS.earthyGreen} stroke={COLORS.white} />
    ),
    Hydroelectric: (
      <HydroelectricIcon fill={COLORS.frenchBlue} stroke={undefined} />
    ),
    'Land-Based Wind': (
      <LandBasedWindIcon fill={COLORS.skyBlue} stroke={undefined} />
    ),
    'Pumped Storage': (
      <PumpedStorageIcon fill={COLORS.cyanBlue} stroke={undefined} />
    ),
    'Solar PV': <SolarPvIcon fill={COLORS.yellow} stroke={undefined} />,
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
