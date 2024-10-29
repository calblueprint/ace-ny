'use client';

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { queryProjectbyId } from '../../api/supabase/queries/query';
import { Project } from '../../types/schema';
import * as styles from './styles';
import {
  AllKDMS,
  KeyDevelopmentMilestone,
  MilestoneIcon,
  MilestoneLabel,
} from './styles';

interface Milestone {
  milestoneTitle: string;
  completed: boolean;
  date: string;
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
    key_development_milestones,
    // proposed_cod,
    // approved
  } = project || {};

  return (
    <div>
      <Modal
        isOpen={openFirst}
        style={{
          overlay: styles.modalOverlayStyles,
          content: styles.modalContentStyles,
        }}
      >
        <div style={styles.projectContainerStyles}>
          <img
            src={project_image ? project_image : ''}
            alt="Project Image"
            style={styles.projectImageStyles}
          />
          <div style={styles.searchBarStyles}>Search</div>
          <div style={styles.projectNameStyles}>
            <div style={styles.developerStyles}>
              Developer - {developer}
              <button onClick={closeModal} style={styles.closeButtonStyles}>
                Close
              </button>
            </div>
            <div>{project_name}</div>
            <div>{project_status}</div>
            <div>{renewable_energy_technology}</div>
          </div>
        </div>
        <div>{size}</div>
        <AllKDMS>
          {key_development_milestones?.map(
            (milestone: Milestone, i: number) => {
              let milestoneLabel = '';
              let icon = <></>;
              let kdmNumber = 0;

              switch (milestone.milestoneTitle) {
                case 'Entry to NYISO Queue':
                  milestoneLabel = 'NYISO queue entered';
                  kdmNumber = 1;
                  break;
                case 'Application for permit to ORES':
                  milestoneLabel = 'ORES permit applied';
                  kdmNumber = 2;
                  break;
                case 'Issuance of permit from ORES':
                  milestoneLabel = 'ORES permit issued';
                  kdmNumber = 3;
                  break;
                case 'Winning a contract award from NYSERDA':
                  milestoneLabel = 'NYSERDA contracted';
                  kdmNumber = 4;
                  break;
                case 'Execution of an Interconnection Agreement (IA)':
                  milestoneLabel = 'IA executed';
                  kdmNumber = 5;
                  break;
                case 'Start of operations':
                  milestoneLabel = 'Operations begun';
                  kdmNumber = 6;
              }

              if (milestone.completed) {
                icon = (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="7"
                    viewBox="0 0 8 7"
                    fill="none"
                  >
                    <path
                      d="M7.66153 7H0.769226V6H7.66153V7ZM3.23076 4.71L1.26153 2.71L1.95569 2.005L3.23076 3.295L6.47507 0L7.16923 0.71L3.23076 4.71Z"
                      fill="#ABBFF0"
                    />
                  </svg>
                );
              } else {
                icon = (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="2"
                    viewBox="0 0 7 2"
                    fill="none"
                  >
                    <path
                      d="M5.92308 1.5C5.51523 1.5 5.18461 1.16421 5.18461 0.75C5.18461 0.335786 5.51523 0 5.92308 0C6.33092 0 6.66154 0.335786 6.66154 0.75C6.66154 0.948912 6.58374 1.13968 6.44525 1.28033C6.30676 1.42098 6.11893 1.5 5.92308 1.5ZM3.70769 1.5C3.29985 1.5 2.96923 1.16421 2.96923 0.75C2.96923 0.335786 3.29985 0 3.70769 0C4.11553 0 4.44615 0.335786 4.44615 0.75C4.44615 0.948912 4.36835 1.13968 4.22986 1.28033C4.09137 1.42098 3.90354 1.5 3.70769 1.5ZM1.49231 1.5C1.08447 1.5 0.753845 1.16421 0.753845 0.75C0.753845 0.335786 1.08447 0 1.49231 0C1.90015 0 2.23077 0.335786 2.23077 0.75C2.23077 0.948912 2.15297 1.13968 2.01448 1.28033C1.87599 1.42098 1.68816 1.5 1.49231 1.5Z"
                      fill="#DDE0E5"
                    />
                  </svg>
                );
              }

              return (
                <KeyDevelopmentMilestone key={i} status={milestone.completed}>
                  {milestoneLabel}
                  <MilestoneLabel status={milestone.completed}>
                    <MilestoneIcon status={milestone.completed}>
                      {icon}
                    </MilestoneIcon>
                    KDM {kdmNumber}
                  </MilestoneLabel>
                </KeyDevelopmentMilestone>
              );
            },
          )}
        </AllKDMS>
        <div style={styles.additionalInfoStyles}>
          DETAILS
          <br></br>
          {additional_information}
        </div>
      </Modal>
    </div>
  );
}
