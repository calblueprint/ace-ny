'use client';

import React from 'react';
import Modal from 'react-modal';
import {
  modalContentStyles,
  modalOverlayStyles,
  ProjectDetails,
} from './styles';

export default function AllProjectsModal() {
  return (
    <Modal
      isOpen={true}
      style={{
        overlay: modalOverlayStyles,
        content: modalContentStyles,
      }}
    >
      <ProjectDetails>hi</ProjectDetails>
    </Modal>
  );
}
