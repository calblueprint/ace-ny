'use client';

import React, { useState } from 'react';
import { FiZap } from 'react-icons/fi';
import Modal from 'react-modal';
import Image from 'next/image';
import {
  DeveloperIcon,
  ExitModalIcon,
  OpenLinkIcon,
} from '@/assets/Project-Icons/icons';
import COLORS from '@/styles/colors';
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
  AdditionalInfoContainer,
  CloseButton,
  Developer,
  DeveloperText,
  EconomicBenefits,
  EconomicBenefitsContainer,
  LastUpdatedDiv,
  modalContentStyles,
  modalOverlayStyles,
  OpenLink,
  ProjectDetails,
  ProjectFilterWrapper,
  projectImageStyles,
  ProjectName,
  ProjectOverview,
  ProjectSizeDiv,
  ProjectStorageDiv,
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
  project,
}: {
  selectedProjectId: number | null;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number | null>>;
  project: Project | undefined;
}) {
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
    project_website_link,
    economic_benefits,
  } = project || {};

  // Map KDMs
  const [isKDMOpen, setIsKDMOpen] = useState<boolean>(false);

  const closeModal = () => {
    document.title = 'ACE NY';
    setSelectedProjectId(null); // close modal
  };

  /* If they decide to move project size + storage size together again, use this to display it!
  const getProjectSize = () => {
    if (has_energy_storage || has_pumped_storage) {
      return size + ' + ' + storage_size;
    }
    return size;
  };*/

  function convertLastUpdatedDateToString() {
    if (!last_updated_display) return '';
    const res = new Date(last_updated_display);

    const year = String(res.getUTCFullYear());
    const month = res.toLocaleString('default', {
      month: 'long',
      timeZone: 'UTC',
    });
    const day = String(res.getUTCDate()).padStart(2, '0');

    return `${month} ${day}, ${year}`;
  }

  return (
    <Modal
      isOpen={selectedProjectId !== null}
      style={{
        overlay: modalOverlayStyles,
        content: modalContentStyles,
      }}
      ariaHideApp={false}
    >
      <CloseButton onClick={closeModal}>
        <ExitModalIcon />
      </CloseButton>
      <ProjectDetails>
        <Image
          src={
            project_image ||
            'https://odgsveffrfpkumjyuere.supabase.co/storage/v1/object/public/project_images/blur_image.jpg'
          }
          alt={
            project_image
              ? `${project_name} project image`
              : 'No image available'
          }
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
            {project_website_link ? (
              <OpenLink
                href={project_website_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <OpenLinkIcon />
              </OpenLink>
            ) : null}
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
            <AccentText1>{size}</AccentText1>
            <AccentText2>MW</AccentText2>
          </SizeInfo>
        </ProjectSizeDiv>
        {storage_size ? (
          <ProjectStorageDiv>
            <SubHeading2>STORAGE CAPACITY</SubHeading2>
            <SizeInfo>
              <FiZap color={COLORS.electricBlue} size={25} />
              <AccentText1>{storage_size}</AccentText1>
              <AccentText2>MW</AccentText2>
            </SizeInfo>
          </ProjectStorageDiv>
        ) : null}
        <TechnologyDiv>
          <TechnologyLabel>
            <SubHeading2>TECHNOLOGY</SubHeading2>
          </TechnologyLabel>
          <TechnologyInfo>
            <TechnologyTags technology={renewable_energy_technology} />
            {has_energy_storage ? (
              <TechnologyTags technology={'Energy Storage'} />
            ) : null}
            {has_pumped_storage ? (
              <TechnologyTags technology={'Pumped Storage'} />
            ) : null}
          </TechnologyInfo>
        </TechnologyDiv>
        <KDMDropdown
          key_development_milestones={key_development_milestones}
          isOpen={isKDMOpen}
          setIsOpen={setIsKDMOpen}
        />
        {economic_benefits ? (
          <EconomicBenefits>
            <EconomicBenefitsContainer>
              <SubHeading2>ECONOMIC BENEFITS</SubHeading2>
              <BodyText1>{economic_benefits}</BodyText1>
            </EconomicBenefitsContainer>
          </EconomicBenefits>
        ) : null}
        {additional_information ? (
          <AdditionalInfo>
            <AdditionalInfoContainer>
              <SubHeading2>DETAILS</SubHeading2>
              <BodyText1>{additional_information}</BodyText1>
            </AdditionalInfoContainer>
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
