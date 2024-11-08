'use client';

import React, { useEffect, useState } from 'react';
import { FiX, FiZap } from 'react-icons/fi';
import Modal from 'react-modal';
import Image from 'next/image';
import {
  queryDefaultImages,
  queryProjectbyId,
} from '../../api/supabase/queries/query';
import {
  AccentText1,
  AccentText2,
  BodyText1,
  Heading1,
  TagText1,
} from '../../styles/texts';
import { Project } from '../../types/schema';
import KeyDevelopmentMilestone from '../KeyDevelopmentMilestone';
import StatusTags from '../StatusTags';
import {
  AdditionalInfo,
  AdditionalText,
  AllKDMS,
  CloseButton,
  DetailsContainer,
  Developer,
  Divider,
  modalContentStyles,
  modalOverlayStyles,
  ProjectDetails,
  ProjectFilter,
  ProjectFilterWrapper,
  projectImageStyles,
  ProjectName,
  ProjectOverview,
  ProjectSize,
} from './styles';

interface Milestone {
  milestoneTitle: string;
  completed: boolean;
  date: string | null;
}

export default function ProjectModal({
  project_id,
  closeModal,
  openFirst,
}: {
  project_id: number;
  closeModal: () => void;
  openFirst: boolean;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);

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
    // proposed_cod,
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

  return (
    <div>
      <Modal
        isOpen={openFirst}
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
              <BodyText1>Developer ‣ {developer}</BodyText1>
              <CloseButton onClick={closeModal}>
                <FiX size={20} color="#000" />
              </CloseButton>
            </Developer>
            <ProjectName>
              <Heading1>{project_name?.toUpperCase()}</Heading1>
            </ProjectName>
            <ProjectFilterWrapper>
              <StatusTags projectStatus={project_status} cod={null} />
              <ProjectFilter>
                <TagText1>{renewable_energy_technology}</TagText1>
              </ProjectFilter>
            </ProjectFilterWrapper>
          </ProjectOverview>
          <ProjectSize>
            <AccentText1>
              <FiZap size={42} />
              {size}
            </AccentText1>
            <AccentText2>Megawatts (MW)</AccentText2>
          </ProjectSize>
          <Divider />
          <AllKDMS>{KDMs}</AllKDMS>
          <AdditionalInfo>
            <DetailsContainer>
              <BodyText1>DETAILS</BodyText1>
              <Divider />
            </DetailsContainer>
            <AdditionalText>
              <BodyText1>{additional_information}</BodyText1>
            </AdditionalText>
          </AdditionalInfo>
        </ProjectDetails>
      </Modal>
    </div>
  );
}
