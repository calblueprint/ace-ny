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
import { TechnologyTag } from './styles';

export default function TechnologyTags({
  technology,
}: {
  technology: string | undefined;
}) {
  return (
    <div>
      {technology === 'Solar' && (
        <>
          <TechnologyTag>
            <SolarPowerIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTag>
        </>
      )}
      {technology === 'Geothermal' && (
        <>
          <TechnologyTag>
            <GeothermalIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTag>
        </>
      )}
      {technology === 'Offshore Wind' && (
        <>
          <TechnologyTag>
            <OffshoreWindIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTag>
        </>
      )}
      {technology === 'Hydroelectric' && (
        <>
          <TechnologyTag>
            <HydroelectricIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTag>
        </>
      )}
      {technology === 'Land-Based Wind' && (
        <>
          <TechnologyTag>
            <LandBasedWindIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTag>
        </>
      )}
      {technology === 'Pumped Storage' && (
        <>
          <TechnologyTag>
            <PumpedStorageIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTag>
        </>
      )}
      {technology === 'Battery Storage' && (
        <>
          <TechnologyTag>
            <EnergyStorageIcon /> <TagText1>{technology}</TagText1>
          </TechnologyTag>
        </>
      )}
    </div>
  );
}
