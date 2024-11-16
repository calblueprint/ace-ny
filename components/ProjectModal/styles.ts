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
`;

export const projectImageStyles: CSSProperties = {
  objectFit: 'cover',
  width: '100%',
  maxHeight: '15.625rem',
  height: '15.625rem',
  borderRadius: '8px 8px 0px 0px',
};

export const ProjectOverview = styled.div`
  display: flex;
  flex-direction: column;
  width: 19.75rem;
  minheight: 8.0625rem;
  margin-top: -6.5rem;
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow:
    0px 2px 6px rgba(77, 87, 114, 0.08),
    0px -2px 5px rgba(255, 255, 255, 0.1);
  position: relative;
  box-sizing: border-box;
  padding: 1rem;
  objectfit: cover;
`;

export const Developer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProjectName = styled.div`
  overflow: visible;
  text-overflow: ellipsis;
  padding-bottom: 0.75rem;
`;

export const ProjectFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
`;

export const CloseButton = styled.button`
  box-shadow: none;
  background: none;
  border: none;
  cursor: pointer;
`;

export const ProjectSize = styled.div`
  display: flex;
  align-items: baseline;
  width: 16.25rem;
  padding-top: 1.2rem;
  gap: 0.5rem;
`;

export const Divider = styled.hr`
  width: 16.25rem;
  border: 0;
  height: 1px;
  margin: 0px 0;
  background: rgba(46, 58, 89, 0.1);
`;

export const AdditionalInfo = styled.div`
  width: 16.25rem;
  padding: 1.25rem;
`;

export const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
`;

export const AdditionalText = styled.div`
  padding-top: 1.25rem;
`;

export const AllKDMS = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 16.625rem;
  height: 8.25rem;
  margin-top: 1.9375rem;
  margin-bottom: 1.25rem;
  gap: 0.75rem;
`;
