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
  top: '5.3125rem',
  left: '1.25rem',
  width: '90vw',
  maxWidth: '22.25rem',
  height: '85vh',
  borderRadius:
    'var(--Spacing-Medium, 1.5rem) var(--Spacing-Medium, 1.5rem) 1.875rem 1.875rem',
  border: '0.75px solid var(--WorldPeas-White, #fff)',
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
  padding-bottom: 0.8125rem;
`;

export const AllProjectsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.4375rem;
`;
