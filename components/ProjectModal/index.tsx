'use client';

import React, { useEffect, useState } from 'react';
import { queryProjectbyId } from '../../api/supabase/queries/query';
import {
  AccentText1,
  BodyText1,
  BodyText2,
  Heading1,
} from '../../styles/texts';
import { Project } from '../../types/schema';
import * as styles from './styles';
import {
  AdditionalInfo,
  AdditionalText,
  CloseButton,
  Developer,
  Divider,
  ModalContent,
  ModalOverlay,
  ProjectDetails,
  ProjectDetailsBorder,
  ProjectFilter,
  ProjectFilterWrapper,
  ProjectName,
  ProjectOverview,
  ProjectSize,
  SearchBar,
} from './styles';

export default function ProjectModal({ project_id }: { project_id: number }) {
  const [isOpen, setOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    queryProjectbyId(project_id).then(data => {
      setProject(data);
    });
  }, [project_id]);

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
    // key_development_milestones,
    // proposed_cod,
    // approved
  } = project || {};

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>Open</button>
      <ModalContent isOpen={isOpen}>
        <ModalOverlay>
          <SearchBar>Search</SearchBar>
          <ProjectDetailsBorder>
            <ProjectDetails>
              <img
                src={project_image ? project_image : ''}
                alt="Project Image"
                style={styles.projectImageStyles}
              />
              <ProjectOverview>
                <Developer>
                  <BodyText1>Developer - {developer}</BodyText1>
                  <CloseButton onClick={toggleModal}>X</CloseButton>
                </Developer>
                <ProjectName>
                  <Heading1>{project_name}</Heading1>
                </ProjectName>
                <ProjectFilterWrapper>
                  <ProjectFilter>
                    <BodyText1>{project_status}</BodyText1>
                  </ProjectFilter>
                  <ProjectFilter>
                    <BodyText1>{renewable_energy_technology}</BodyText1>
                  </ProjectFilter>
                </ProjectFilterWrapper>
              </ProjectOverview>
              <ProjectSize>
                <AccentText1>{size}</AccentText1>
              </ProjectSize>
              <Divider />
              <AdditionalInfo>
                <BodyText1>DETAILS</BodyText1>
                <AdditionalText>
                  <BodyText1>
                    HIIIIIII{/* {additional_information} */}
                  </BodyText1>
                </AdditionalText>
              </AdditionalInfo>
            </ProjectDetails>
          </ProjectDetailsBorder>
        </ModalOverlay>
      </ModalContent>
    </div>
  );
}
