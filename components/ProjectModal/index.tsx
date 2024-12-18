'use client';

import React, { useEffect, useState } from 'react';
import { FiX, FiZap } from 'react-icons/fi';
import Modal from 'react-modal';
import Image from 'next/image';
import { DeveloperIcon } from '@/assets/Project-Icons/icons';
import {
  queryDefaultImages,
  queryProjectbyId,
} from '../../api/supabase/queries/query';
import {
  AccentText1,
  AccentText2,
  BodyText1,
  Heading1,
} from '../../styles/texts';
import { Milestone, Project } from '../../types/schema';
import KeyDevelopmentMilestone from '../KeyDevelopmentMilestone';
import StatusTags from '../StatusTag';
import TechnologyTags from '../TechnologyTag';
import {
  AdditionalInfo,
  AdditionalText,
  AllKDMS,
  CloseButton,
  DetailsContainer,
  Developer,
  DeveloperText,
  Divider,
  modalContentStyles,
  modalOverlayStyles,
  ProjectDetails,
  ProjectFilterWrapper,
  projectImageStyles,
  ProjectName,
  ProjectOverview,
  ProjectSize,
} from './styles';

export default function ProjectModal({
  selectedProjectId,
  setSelectedProjectId,
}: {
  selectedProjectId: number | null;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);

  useEffect(() => {
    queryProjectbyId(selectedProjectId ?? 0).then(data => {
      setProject(data);
    });
  }, [selectedProjectId]);

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
    document.title = 'Project - ' + project?.project_name;
    fetchDefaultImage();
  }, [project]);

  const {
    // id,
    project_name,
    renewable_energy_technology,
    size,
    developer,
    // longitude,
    // latitude,
    project_status,
    // county,
    // town,
    // region,
    // state_senate_district,
    // assembly_district,
    project_image,
    additional_information,
    key_development_milestones,
    proposed_cod,
    // approved
  } = project || {};

  // Map KDMs
  const KDMs = key_development_milestones?.map(
    (milestone: Milestone, i: number) => {
      return (
        <KeyDevelopmentMilestone
          key={i}
          index={i}
          completed={milestone.completed}
          date={milestone.date}
        ></KeyDevelopmentMilestone>
      );
    },
  );

  const getProjectImageSrc = () => {
    return project_image || defaultImage || '';
  };

  const projectImageAlt = project_image
    ? `${project_name} project image`
    : defaultImage
      ? `${renewable_energy_technology} default image`
      : 'No image available';

  const closeModal = () => {
    document.title = 'ACE NY';
    setSelectedProjectId(null); // close modal
  };

  return (
    <Modal
      isOpen={selectedProjectId !== null}
      style={{
        overlay: modalOverlayStyles,
        content: modalContentStyles,
      }}
    >
      <ProjectDetails>
        <Image
          src={getProjectImageSrc()}
          alt={projectImageAlt}
          width={340}
          height={250}
          style={projectImageStyles}
        />
        <ProjectOverview>
          <Developer>
            <DeveloperText $isDeveloperEmpty={!developer}>
              <BodyText1>
                Developer{' '}
                <DeveloperIcon
                  width={'0.5rem'}
                  height={'0.5rem'}
                ></DeveloperIcon>{' '}
                {developer}
              </BodyText1>
            </DeveloperText>
            <CloseButton onClick={closeModal}>
              <FiX size={20} color="#000" />
            </CloseButton>
          </Developer>
          <ProjectName>
            <Heading1>{project_name?.toUpperCase()}</Heading1>
          </ProjectName>
          <ProjectFilterWrapper>
            <StatusTags projectStatus={project_status} cod={proposed_cod} />
            <TechnologyTags technology={renewable_energy_technology} />
          </ProjectFilterWrapper>
        </ProjectOverview>
        <ProjectSize>
          <AccentText1>
            <FiZap size={38} />
            {size}
          </AccentText1>
          <AccentText2>Megawatts</AccentText2>
        </ProjectSize>
        <Divider />
        <AllKDMS>{KDMs}</AllKDMS>
        <AdditionalInfo>
          <DetailsContainer $isDetailsEmpty={!additional_information}>
            <BodyText1>DETAILS</BodyText1>
            <Divider />
          </DetailsContainer>
          <AdditionalText>
            <BodyText1>{additional_information}</BodyText1>
          </AdditionalText>
        </AdditionalInfo>
      </ProjectDetails>
    </Modal>
  );
}
