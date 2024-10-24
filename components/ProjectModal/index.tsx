'use client';

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { queryProjectbyId } from '../../api/supabase/queries/query';
import { Project } from '../../types/schema';
import * as styles from './styles';

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
      <Modal
        isOpen={isOpen}
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
              <button onClick={toggleModal} style={styles.closeButtonStyles}>
                Close
              </button>
            </div>
            <div>{project_name}</div>
            <div>{project_status}</div>
            <div>{renewable_energy_technology}</div>
          </div>
        </div>
        <div>{size}</div>
        <div style={styles.additionalInfoStyles}>
          DETAILS
          <br></br>
          {additional_information}
        </div>
      </Modal>
    </div>
  );
}
