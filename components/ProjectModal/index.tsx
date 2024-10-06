'use client';

import { useState } from 'react';
import Modal from 'react-modal';

// interface ProjectModalProps {
//   id?: bigint;
//   project_name?: string;
//   energy_category?: string;
//   size?: bigint;
//   developer?: string;
//   longitude?: bigint;
//   latitude?: bigint;
//   project_status?: string;
//   county?: string;
//   town?: string;
//   region?: string;
//   state_senate_district?: string;
//   assembly_district?: string;
//   project_image?: string;
//   additional_info?: string;
//   key_development_milestone?: string;
// }

export default function ProjectModal() {
  const [isOpen, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>Open</button>
      <Modal
        isOpen={isOpen}
        onAfterOpen={toggleModal}
        onAfterClose={toggleModal}
      >
        meow
        <button onClick={toggleModal}>Close</button>
      </Modal>
    </div>
  );
}
