import {
  EnergyStorageIcon,
  GeothermalIcon,
  HydroelectricIcon,
  LandBasedWindIcon,
  OffshoreWindIcon,
  PumpedStorageIcon,
  SolarPowerIcon,
} from '../../assets/Technology-Tag-Icons/icons';
import { TagText1 } from '../../styles/texts';
import { TechnologyTagStyles } from './styles';

export default function TechnologyTag({
  technology,
}: {
  technology: string | undefined;
}) {
  return (
    <div>
      {technology === 'Solar' && (
        <>
          <TechnologyTagStyles>
            <SolarPowerIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTagStyles>
        </>
      )}
      {technology === 'Geothermal' && (
        <>
          <TechnologyTagStyles>
            <GeothermalIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTagStyles>
        </>
      )}
      {technology === 'Offshore Wind' && (
        <>
          <TechnologyTagStyles>
            <OffshoreWindIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTagStyles>
        </>
      )}
      {technology === 'Hydroelectric' && (
        <>
          <TechnologyTagStyles>
            <HydroelectricIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTagStyles>
        </>
      )}
      {technology === 'Land-Based Wind' && (
        <>
          <TechnologyTagStyles>
            <LandBasedWindIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTagStyles>
        </>
      )}
      {technology === 'Pumped Storage' && (
        <>
          <TechnologyTagStyles>
            <PumpedStorageIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTagStyles>
        </>
      )}
      {technology === 'Battery Storage' && (
        <>
          <TechnologyTagStyles>
            <EnergyStorageIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTagStyles>
        </>
      )}
    </div>
  );
}
