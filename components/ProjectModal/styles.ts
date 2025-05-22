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
  padding-bottom: 0.75rem;
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
  align-items: flex-start;
`;

export const DeveloperText = styled.div<{ $isDeveloperEmpty: boolean }>`
  display: flex;
  visibility: ${({ $isDeveloperEmpty }) =>
    $isDeveloperEmpty ? 'hidden' : 'visible'};
  width: 95%;
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
  z-index: 5;
  position: fixed;
  top: 1.5rem;
  right: 1.4rem;
`;

export const OpenLink = styled.a`
  cursor: pointer;
`;

export const UtilityDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 16.95rem;
  padding: 0.75rem 1.4rem;
  border-radius: 12px 12px 8px 8px;
  border: 1px solid rgba(46, 58, 89, 0.05);
  box-shadow: 0px -2px 5px 0px rgba(255, 255, 255, 0.1);
`;

export const ProjectSizeDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 16.95rem;
  padding: 1.25rem 1.4rem;
  border-radius: 8px 8px 12px 12px;
  border: 1px solid rgba(46, 58, 89, 0.05);
  box-shadow: 0px -2px 5px 0px rgba(255, 255, 255, 0.1);
`;

export const SizeLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProjectStorageDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 16.95rem;
  padding: 0.75rem 1.4rem;
  border-radius: 8px 8px 12px 12px;
  border: 1px solid rgba(46, 58, 89, 0.05);
  box-shadow: 0px -2px 5px 0px rgba(255, 255, 255, 0.1);
`;

export const SizeInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.3rem;
  align-items: flex-end;
`;

export const TechnologyDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 16.95rem;
  padding: 1.25rem 1.4rem;
  border-radius: 8px 8px 12px 12px;
  border: 1px solid rgba(46, 58, 89, 0.05);
  box-shadow: 0px -2px 5px 0px rgba(255, 255, 255, 0.1);
`;

export const TechnologyLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TechnologyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 16.95rem;
  padding: 1.25rem 1.4rem;
  border-radius: 8px 8px 12px 12px;
  border: 1px solid rgba(46, 58, 89, 0.05);
  box-shadow: 0px -2px 5px 0px rgba(255, 255, 255, 0.1);
`;

export const EconomicBenefits = styled.div`
  display: flex;
  flex-direction: column;
  width: 16.95rem;
  padding: 1.25rem 1.4rem;
  border-radius: 8px 8px 12px 12px;
  border: 1px solid rgba(46, 58, 89, 0.05);
  box-shadow: 0px -2px 5px 0px rgba(255, 255, 255, 0.1);
`;

export const AdditionalInfoContainer = styled.div`
  display: flex;
  word-break: break-word;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 0.75rem;
`;

export const EconomicBenefitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  word-break: break-word;
  align-items: flex-start;
  width: 100%;
  gap: 0.75rem;
`;

export const LastUpdatedDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 16.95rem;
  padding: 0.75rem 1.4rem;
  border-radius: 8px 8px 12px 12px;
  border: 1px solid rgba(46, 58, 89, 0.05);
  box-shadow: 0px -2px 5px 0px rgba(255, 255, 255, 0.1);
`;
