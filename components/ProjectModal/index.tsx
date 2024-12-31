'use client';

import React, { useEffect, useState } from 'react';
import { FiX, FiZap } from 'react-icons/fi';
import Modal from 'react-modal';
import Image from 'next/image';
import { DeveloperIcon } from '@/assets/Project-Icons/icons';
import COLORS from '@/styles/colors';
import {
  queryDefaultImages,
  queryProjectbyId,
} from '../../api/supabase/queries/query';
import {
  AccentText1,
  AccentText2,
  BodyText1,
  Heading1,
  SubHeading2,
} from '../../styles/texts';
import { Project } from '../../types/schema';
import DefaultTag from '../DefaultTag';
import KDMDropdown from '../KDMDropdown';
import StatusTags from '../StatusTag';
import TechnologyTags from '../TechnologyTag';
import {
  AdditionalInfo,
  CloseButton,
  DetailsContainer,
  Developer,
  DeveloperText,
  LastUpdatedDiv,
  modalContentStyles,
  modalOverlayStyles,
  ProjectDetails,
  ProjectFilterWrapper,
  projectImageStyles,
  ProjectName,
  ProjectOverview,
  ProjectSizeDiv,
  SizeInfo,
  SizeLabel,
  TechnologyDiv,
  TechnologyInfo,
  TechnologyLabel,
  UtilityDiv,
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
    // interconnection_number,
    // permit_process: string | null;
    // permit_application_number: string | null;
    // last_updated: Date;
    utility,
    last_updated_display,
    has_energy_storage,
    has_pumped_storage,
    storage_size,
  } = project || {};

  // Map KDMs
  const [isKDMOpen, setIsKDMOpen] = useState<boolean>(false);

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

  const getProjectSize = () => {
    if (has_energy_storage || has_pumped_storage) {
      return size + ' + ' + storage_size;
    }
    return size;
  };

  function convertLastUpdatedDateToString() {
    if (!last_updated_display) return '';
    const res = new Date(last_updated_display);
    const year = String(res.getFullYear());
    const month = res.toLocaleString('default', { month: 'long' });
    const day = String(res.getDate()).padStart(2, '0');
    return `${month} ${day}, ${year}`;
  }

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
            <StatusTags
              projectStatus={project_status ? project_status : ''}
              cod={proposed_cod}
            />
          </ProjectFilterWrapper>
        </ProjectOverview>
        {utility ? (
          <UtilityDiv>
            <SubHeading2>UTILITY</SubHeading2>
            <DefaultTag
              content={utility}
              icon_category={'Utility Service Territory'}
              size={0}
            />
          </UtilityDiv>
        ) : null}
        <ProjectSizeDiv>
          <SizeLabel>
            <SubHeading2>PROJECT SIZE</SubHeading2>
            <DefaultTag
              content={''}
              icon_category={'Project Size'}
              size={size}
            />
          </SizeLabel>
          <SizeInfo>
            <FiZap color={COLORS.electricBlue} size={25} />
            <AccentText1>{getProjectSize()}</AccentText1>
            <AccentText2>MW</AccentText2>
          </SizeInfo>
        </ProjectSizeDiv>
        <TechnologyDiv>
          <TechnologyLabel>
            <SubHeading2>TECHNOLOGY</SubHeading2>
          </TechnologyLabel>
          <TechnologyInfo>
            <TechnologyTags technology={renewable_energy_technology} />
            {has_pumped_storage ? (
              <TechnologyTags technology={'Pumped Storage'} />
            ) : null}
            {has_energy_storage ? (
              <TechnologyTags technology={'Energy Storage'} />
            ) : null}
          </TechnologyInfo>
        </TechnologyDiv>
        <KDMDropdown
          key_development_milestones={key_development_milestones}
          isOpen={isKDMOpen}
          setIsOpen={setIsKDMOpen}
        />
        {additional_information ? (
          <AdditionalInfo>
            <DetailsContainer>
              <BodyText1>DETAILS</BodyText1>
              <BodyText1>{additional_information}</BodyText1>
            </DetailsContainer>
          </AdditionalInfo>
        ) : null}
        <LastUpdatedDiv>
          <SubHeading2>LAST UPDATED</SubHeading2>
          <DefaultTag
            content={convertLastUpdatedDateToString()}
            icon_category={'Last Updated'}
            size={0}
          />
        </LastUpdatedDiv>
      </ProjectDetails>
    </Modal>
  );
}
