'use client';

import Image from 'next/image';
import { DeveloperIcon } from '@/assets/Project-Icons/icons';
import { SmallSizeIcon } from '@/assets/Size-Icons/icons';
import {
  GreenDotOperationalIcon,
  GreyDotInProgressIcon,
} from '@/assets/Status-Tag-Icons/icons';
import {
  EnergyStorageIcon,
  GeothermalIcon,
  HydroelectricIcon,
  LandBasedWindIcon,
  OffshoreWindIcon,
  PumpedStorageIcon,
  SolarPvIcon,
} from '@/assets/Technology-Tag-Icons/icons';
import COLORS from '@/styles/colors';
import { BodyText1, Heading2, TagText1 } from '@/styles/texts';
import { Project } from '@/types/schema';
import {
  DeveloperInfo,
  DeveloperOverflow,
  projectImageStyles,
  ProjectInfo,
  ProjectName,
  ProjectSize,
  ProjectSizeAndType,
  ProjectStatus,
  ProjectType,
  StyledProjectItem,
} from './styles';

export default function ProjectItem({
  project_id,
  map,
  setSelectedProjectId,
  project,
}: {
  project_id: number;
  map: google.maps.Map | null;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number | null>>;
  project: Project;
}) {
  const zoomThreshold = 11;

  const {
    // id,
    project_name,
    renewable_energy_technology,
    size,
    developer,
    longitude,
    latitude,
    project_status,
    // county,
    // town,
    // region,
    // state_senate_district,
    // assembly_district,
    project_image,
    // additional_information,
    // key_development_milestones,
    // proposed_cod,
    // approved
    has_energy_storage,
    has_pumped_storage,
  } = project || {};

  // Sets status label to "Operational" or "In Progress"
  let projectStatus = project_status;
  if (project_status !== 'Operational') {
    projectStatus = 'Proposed';
  }

  // Sets status icon to OperationalIcon or InProgressIcon
  let statusIcon = <GreenDotOperationalIcon />;
  if (project_status !== 'Operational') {
    statusIcon = <GreyDotInProgressIcon />;
  }

  const energyTypeIconMap: { [key: string]: JSX.Element } = {
    'Land-Based Wind': (
      <LandBasedWindIcon fill={COLORS.skyBlue} width={'8'} height={'11'} />
    ),
    'Solar PV': (
      <SolarPvIcon fill={COLORS.solarYellow} width={'10'} height={'9'} />
    ),
    Hydroelectric: (
      <HydroelectricIcon fill={COLORS.frenchBlue} width={'12'} height={'9'} />
    ),
    'Offshore Wind': (
      <OffshoreWindIcon
        fill={COLORS.electricBlue}
        stroke={COLORS.navy}
        width={'9'}
        height={'11'}
      />
    ),
    Geothermal: (
      <GeothermalIcon fill={COLORS.earthyGreen} width={'9'} height={'9'} />
    ),
    'Energy Storage': (
      <EnergyStorageIcon
        fill={COLORS.teal}
        stroke={COLORS.white}
        width={'13'}
        height={'9'}
      />
    ),
    'Pumped Storage': (
      <PumpedStorageIcon fill={COLORS.cyanBlue} width={'12'} height={'9'} />
    ),
  };

  const handleProjectClick = () => {
    if (!map) return;
    const position = new google.maps.LatLng(latitude ?? 0, longitude ?? 0);
    const currZoom = map?.getZoom() ?? 0;

    map.panTo(position);
    if (currZoom < zoomThreshold) {
      google.maps.event.addListenerOnce(map, 'idle', () => {
        map.setZoom(zoomThreshold);
      });
    }

    setSelectedProjectId(project_id);
  };

  return (
    <StyledProjectItem onClick={handleProjectClick}>
      <ProjectInfo>
        <ProjectName>
          <Heading2>{project_name?.toUpperCase()}</Heading2>
        </ProjectName>

        <DeveloperInfo $isDeveloperEmpty={!developer}>
          <DeveloperIcon width={'0.5rem'} height={'0.5rem'} />

          <DeveloperOverflow>
            <BodyText1>{developer}</BodyText1>
          </DeveloperOverflow>
        </DeveloperInfo>
        <ProjectSizeAndType>
          <ProjectStatus>
            {statusIcon}
            <TagText1>{projectStatus}</TagText1>
          </ProjectStatus>
          <ProjectSize>
            <SmallSizeIcon />
            <TagText1>{size} MW</TagText1>
          </ProjectSize>
          <ProjectType>
            {energyTypeIconMap[renewable_energy_technology ?? '']}
            {has_energy_storage ? (
              <EnergyStorageIcon
                fill={COLORS.teal}
                stroke={COLORS.white}
                width={'13'}
                height={'9'}
              />
            ) : null}
            {has_pumped_storage ? (
              <PumpedStorageIcon
                fill={COLORS.cyanBlue}
                width={'12'}
                height={'9'}
              />
            ) : null}
          </ProjectType>
        </ProjectSizeAndType>
      </ProjectInfo>
      <Image
        src={
          project_image ||
          'https://odgsveffrfpkumjyuere.supabase.co/storage/v1/object/public/project_images/blur_image.jpg'
        }
        alt={
          project_image ? `${project_name} project image` : 'No image available'
        }
        width={340}
        height={250}
        style={projectImageStyles}
        placeholder="blur"
        blurDataURL="https://odgsveffrfpkumjyuere.supabase.co/storage/v1/object/public/project_images/blur_image.jpg"
      />
    </StyledProjectItem>
  );
}
