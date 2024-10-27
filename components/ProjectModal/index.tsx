'use client';

import React, { useEffect, useState } from 'react';
import { FiX, FiZap } from 'react-icons/fi';
import Modal from 'react-modal';
import { queryProjectbyId } from '../../api/supabase/queries/query';
import * as texts from '../../styles/texts';
import { Project } from '../../types/schema';
import * as styles from './styles';

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

  return (
    <div>
      <styles.ModalContent isOpen={openFirst}>
        <styles.ModalOverlay>
          <styles.SearchBar>Search</styles.SearchBar>
          <styles.ProjectDetailsBorder>
            <styles.ProjectDetails>
              <img
                src={project_image ? project_image : ''}
                alt="Project Image"
                style={styles.projectImageStyles}
              />
              <styles.ProjectOverview>
                <styles.Developer>
                  <texts.BodyText1>Developer - {developer}</texts.BodyText1>
                  <styles.CloseButton onClick={closeModal}>
                    <FiX size={20} color="#000" />
                  </styles.CloseButton>
                </styles.Developer>
                <styles.ProjectName>
                  <texts.Heading1>{project_name?.toUpperCase()}</texts.Heading1>
                </styles.ProjectName>
                <styles.ProjectFilterWrapper>
                  <styles.ProjectFilter>
                    <texts.BodyText2>{project_status}</texts.BodyText2>
                  </styles.ProjectFilter>
                  <styles.ProjectFilter>
                    <texts.BodyText2>
                      {renewable_energy_technology}
                    </texts.BodyText2>
                  </styles.ProjectFilter>
                </styles.ProjectFilterWrapper>
              </styles.ProjectOverview>
              <styles.ProjectSize>
                <texts.AccentText1>
                  <FiZap size={42} />
                  {size}
                </texts.AccentText1>
                <texts.AccentText2>MW / Mo</texts.AccentText2>
              </styles.ProjectSize>
              <styles.Divider />
              <styles.AdditionalInfo>
                <styles.DetailsContainer>
                  <texts.BodyText1>DETAILS</texts.BodyText1>
                  <styles.Divider /> {/* This is the new divider */}
                </styles.DetailsContainer>
                <styles.AdditionalText>
                  <texts.BodyText1>{additional_information}</texts.BodyText1>
                </styles.AdditionalText>
              </styles.AdditionalInfo>
            </styles.ProjectDetails>
          </styles.ProjectDetailsBorder>
        </styles.ModalOverlay>
      </styles.ModalContent>
    </div>
  );
}
