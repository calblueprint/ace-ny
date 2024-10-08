'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import * as styles from './styles';

interface ProjectModalProps {
  id?: bigint;
  project_name?: string;
  energy_category?: string;
  size?: string;
  developer?: string;
  longitude?: bigint;
  latitude?: bigint;
  project_status?: string;
  county?: string;
  town?: string;
  region?: string;
  state_senate_district?: string;
  assembly_district?: string;
  project_image?: string;
  additional_info?: string;
  key_development_milestone?: string;
}

export default function ProjectModal({
  // id,
  project_name,
  // energy_category,
  size,
  developer,
  // longitude,
  // latitude,
  // project_status,
  // county,
  // town,
  // region,
  // state_senate_district,
  // assembly_district,
  // project_image,
  additional_info,
  // key_development_milestone,
}: ProjectModalProps) {
  const [isOpen, setOpen] = useState(false);

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
        <div style={styles.searchBarStyles}>Search</div>
        <div style={styles.projectNameStyles}>
          <div style={styles.developerStyles}>
            {developer}
            <button onClick={toggleModal}>Close</button>
          </div>
          <div>{project_name}</div>
        </div>
        <div>{size}</div>
        <div style={styles.additionalInfoStyles}>
          DETAILS
          <br></br>
          {additional_info}
        </div>
      </Modal>
    </div>
  );
}
