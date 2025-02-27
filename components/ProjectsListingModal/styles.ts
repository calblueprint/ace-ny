import { CSSProperties } from 'react';
import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const modalOverlayStyles: CSSProperties = {
  width: '21.25rem',
  height: '100%',
  backgroundColor: 'transparent',
};

export const modalContentStyles: CSSProperties = {
  display: 'flex',
  top: '1.25rem',
  left: '1.25rem',
  width: '90vw',
  maxWidth: '22.25rem',
  height: '95vh',
  borderRadius: '1.5rem',
  border: 'none',
  background:
    'linear-gradient(180deg, rgba(250, 250, 250, 0.32) 0%, rgba(238, 238, 238, 0.65) 100%)',
  backdropFilter: 'blur(7.5px)',
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  boxSizing: 'border-box',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
};

export const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--Spacing-Small, 1.2rem);
  height: 100%;
  background: ${COLORS.white};
  width: 21.6rem;
  overflow-y: auto;
  gap: 0.75rem;
`;

export const AllProjectsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 13rem;
  gap: 0.4rem;
  align-items: center;
`;

export const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 0.93rem 0.625rem 0.625rem 0.8125rem;
`;

export const ProjectItemsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const SortByButton = styled.div`
  display: flex;
  flex-direction: row;
  background: ${COLORS.navy30};
  padding: 0.2rem 0.5rem;
  border-radius: 1.25rem;
  gap: 0.3rem;
`;

export const Headers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// Open Modal Button - Floating Button
export const OpenModalButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: #007bff; /* Blue */
  color: white;
  border: none;
  padding: 14px 18px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Darker Blue */
    transform: scale(1.05);
  }
`;

export const CloseModalButton = styled.div`
  position: relative;
  background: white;
  cursor: pointer;
  width: 38px;
  height: 46px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  // position: relative;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // width: fit-content;
`;
