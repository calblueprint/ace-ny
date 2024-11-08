'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  queryDefaultImages,
  queryProjectbyId,
} from '@/api/supabase/queries/query';
import {
  OperationalIcon,
  SmallEnergyStorageIcon,
  SmallGeothermalIcon,
  SmallHydroelectricIcon,
  SmallLandBasedWindIcon,
  SmallOffshoreWindIcon,
  SmallPumpedStorage,
  SmallSizeIcon,
  SmallSolarPowerIcon,
} from '@/assets/Icons/icons';
import { TagText1, TagText2 } from '@/styles/texts';
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

  const projectImageAlt = project_image
    ? `${project_name} project image`
    : defaultImage
      ? `${renewable_energy_technology} default image`
      : 'No image available';

  let projectTypeIcon = <></>;
  switch (renewable_energy_technology) {
    case 'Land-Based Wind':
      projectTypeIcon = <SmallLandBasedWindIcon />;
      break;
    case 'Solar':
      projectTypeIcon = <SmallSolarPowerIcon />;
      break;
    case 'Hydroelectric':
      projectTypeIcon = <SmallHydroelectricIcon />;
      break;
    case 'Offshore Wind':
      projectTypeIcon = <SmallOffshoreWindIcon />;
      break;
    case 'Geothermal':
      projectTypeIcon = <SmallGeothermalIcon />;
      break;
    case 'Energy Storage':
      projectTypeIcon = <SmallEnergyStorageIcon />;
      break;
    case 'Pumped Storage':
      projectTypeIcon = <SmallPumpedStorage />;
      break;
  }

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
        <ProjectName>{project_name?.toUpperCase()}</ProjectName>
        <ProjectStatus>
          <OperationalIcon />
          <TagText1>{project_status}</TagText1>
        </ProjectStatus>
        <ProjectSizeAndType>
          <ProjectSize>
            <SmallSizeIcon />
            <TagText2>{size} MW</TagText2>
          </ProjectSize>
          <ProjectType>
            {projectTypeIcon}
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
