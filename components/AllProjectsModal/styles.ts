import { CSSProperties } from 'react';
import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const modalOverlayStyles: CSSProperties = {
  width: '310px',
  height: '100%',
  backgroundColor: 'transparent',
};

export const modalContentStyles: CSSProperties = {
  display: 'flex',
  top: '85px',
  left: '20px',
  width: '90vw',
  maxWidth: '356px',
  height: '85vh',
  borderRadius: 'var(--Spacing-Small, 16px)',
  border: '0.75px solid var(--WorldPeas-White, #fff)',
  background:
    'linear-gradient(180deg, rgba(250, 250, 250, 0.32) 0%, rgba(238, 238, 238, 0.65) 100%)',
  backdropFilter: 'blur(7.5px)',
  paddingTop: '0.625rem',
  paddingBottom: '0.625rem',
  boxSizing: 'border-box',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
};

export const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--Spacing-Small, 16px);
  height: 100%;
  background: ${COLORS.white};
  width: 340px;
  overflow-y: auto;
`;
