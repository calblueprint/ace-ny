'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  queryDefaultImages,
  queryProjectbyId,
} from '@/api/supabase/queries/query';
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
import { Heading2, TagText2 } from '@/styles/texts';
import { Project } from '@/types/schema';
import ProjectModal from '../ProjectModal';
import {
  projectImageStyles,
  ProjectInfo,
  ProjectName,
  ProjectSize,
  ProjectSizeAndType,
  ProjectStatus,
  ProjectType,
  StyledProjectItem,
} from './styles';

export default function ProjectItem({ project_id }: { project_id: number }) {
  const [project, setProject] = useState<Project | null>(null);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    queryProjectbyId(project_id).then(data => {
      setProject(data);
    });
  }, [project_id]);

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
    // developer,
    // longitude,
    // latitude,
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
  } = project || {};

  const getProjectImageSrc = () => {
    return project_image || defaultImage || '';
  };

  // Sets status label to "Operational" or "In Progress"
  let projectStatus = project_status;
  if (project_status !== 'Operational') {
    projectStatus = 'In Progress';
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
    setModalOpen(true);
  };

  if (modalOpen) {
    return (
      <ProjectModal
        project_id={project_id}
        closeModal={() => setModalOpen(false)}
        openFirst={true}
      />
    );
  }

  return (
    <StyledProjectItem onClick={handleProjectClick}>
      <ProjectInfo>
        <Heading2>
          <ProjectName>{project_name?.toUpperCase()}</ProjectName>
        </Heading2>
        <ProjectStatus>
          {statusIcon}
          <TagText2>{projectStatus}</TagText2>
        </ProjectStatus>
        <ProjectSizeAndType>
          <ProjectSize>
            <SmallSizeIcon />
            <TagText2>{size} MW</TagText2>
          </ProjectSize>
          <ProjectType>
            {energyTypeIconMap[renewable_energy_technology ?? '']}
            <TagText2>{renewable_energy_technology}</TagText2>
          </ProjectType>
        </ProjectSizeAndType>
      </ProjectInfo>
      <Image
        src={getProjectImageSrc()}
        alt={projectImageAlt}
        width={340}
        height={250}
        style={projectImageStyles}
      />
    </StyledProjectItem>
  );
}
