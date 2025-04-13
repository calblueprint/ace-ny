import React from 'react';
import { InfoModalTriangle } from '@/assets/InfoModal-Icons/icons';
import {
  EnergyStorageIcon,
  GeothermalIcon,
  HydroelectricIcon,
  LandBasedWindIcon,
  LineIcon,
  OffshoreWindIcon,
  PumpedStorageIcon,
  SolarPvIcon,
} from '@/assets/Legend-Icons/icons';
import {
  LegendContent,
  LegendStyles,
  LegendTriangleStyles,
  LegendWrapper,
  LineStyles,
  TechnologyStyles,
  TechnologyWrapperStyles,
  TitleStyles,
} from './styles';

const TechnologyItem = ({
  Icon,
  label,
}: {
  Icon: React.ComponentType;
  label: string;
}) => (
  <TechnologyStyles>
    <Icon />
    {label}
  </TechnologyStyles>
);

export default function Legend() {
  return (
    <>
      <LegendStyles>
        <LegendWrapper>
          <LegendContent>
            <TechnologyWrapperStyles>
              <TitleStyles>TECHNOLOGY SOURCE</TitleStyles>
              <TechnologyItem
                Icon={LandBasedWindIcon}
                label="Land-based Wind"
              />
              <TechnologyItem Icon={SolarPvIcon} label="Solar PV" />
              <TechnologyItem Icon={HydroelectricIcon} label="Hydroelectric" />
              <TechnologyItem Icon={OffshoreWindIcon} label="Offshore Wind" />
              <TechnologyItem Icon={GeothermalIcon} label="Geothermal" />
            </TechnologyWrapperStyles>

            <LineStyles>
              <LineIcon />
            </LineStyles>

            <TechnologyWrapperStyles>
              <TitleStyles>TECHNOLOGY STORAGE</TitleStyles>
              <TechnologyItem Icon={EnergyStorageIcon} label="Energy Storage" />
              <TechnologyItem Icon={PumpedStorageIcon} label="Pumped Storage" />
            </TechnologyWrapperStyles>
          </LegendContent>
        </LegendWrapper>
      </LegendStyles>

      <LegendTriangleStyles>
        <InfoModalTriangle />
      </LegendTriangleStyles>
    </>
  );
}
