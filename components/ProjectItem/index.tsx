'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { queryDefaultImages } from '@/api/supabase/queries/query';
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
  //const [project, setProject] = useState<Project | null>(null);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);

  /*useEffect(() => {
    queryProjectbyId(project_id).then(data => {
      setProject(data);
    });
  }, [project_id]);*/

  useEffect(() => {
    // Fetch default image when project data is available
    const fetchDefaultImage = async () => {
      if (!project?.project_image && project?.renewable_energy_technology) {
        try {
          const fetchedImage = await queryDefaultImages(
            project.renewable_energy_technology,
          );
          setDefaultImage(fetchedImage.default_image);
        } catch (error) {
          console.error('Error fetching default image:', error);
        }
      }
    };
    fetchDefaultImage();
  }, [project]);

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

  const getProjectImageSrc = () => {
    return project_image || defaultImage || '';
  };

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

  const projectImageAlt = project_image
    ? `${project_name} project image`
    : defaultImage
      ? `${renewable_energy_technology} default image`
      : 'No image available';

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
    const position = new google.maps.LatLng(latitude ?? 0, longitude ?? 0);
    map?.panTo(position);
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
          getProjectImageSrc() ||
          'https://odgsveffrfpkumjyuere.supabase.co/storage/v1/object/public/project_images/blur_image.jpg'
        }
        alt={projectImageAlt}
        width={340}
        height={250}
        style={projectImageStyles}
        placeholder="blur"
        blurDataURL="https://odgsveffrfpkumjyuere.supabase.co/storage/v1/object/public/project_images/blur_image.jpg"
      />
    </StyledProjectItem>
  );
}
