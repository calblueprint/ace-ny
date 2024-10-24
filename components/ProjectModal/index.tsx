'use client';

import React, { useEffect, useState } from 'react';
import { queryProjectbyId } from '../../api/supabase/queries/query';
import { Project } from '../../types/schema';
import * as styles from './styles';
import {
  AdditionalInfo,
  CloseButton,
  Developer,
  ModalContent,
  ModalOverlay,
  ProjectDetails,
  ProjectDetailsBorder,
  ProjectFilters,
  ProjectName,
  ProjectOverview,
  ProjectStatus,
  ProjectTechnology,
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
      <ModalContent
        isOpen={isOpen}
        style={{
          overlay: {},
          content: {},
        }}
      >
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
                  Developer - {developer}
                  <CloseButton onClick={toggleModal}>X</CloseButton>
                </Developer>
                <ProjectName>{project_name}</ProjectName>
                <ProjectFilters>
                  <ProjectStatus>{project_status}</ProjectStatus>
                  <ProjectTechnology>
                    {renewable_energy_technology}
                  </ProjectTechnology>
                </ProjectFilters>
              </ProjectOverview>
              <div>{size}</div>
              <AdditionalInfo>
                DETAILS
                <br />
                {additional_information}
              </AdditionalInfo>
            </ProjectDetails>
          </ProjectDetailsBorder>
        </ModalOverlay>
      </ModalContent>
    </div>
  );
}
