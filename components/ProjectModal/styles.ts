import { CSSProperties } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import * as fonts from '../../styles/fonts';

// OLD CSS NEEDS TO BE CHANGED TO STYLED COMPONENTS
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

export const projectImageStyles: CSSProperties = {
  objectFit: 'cover',
  borderRadius: '8px 8px 0px 0px',
};

export const ProjectOverview = styled.div`
  display: flex;
  flex-direction: column;
  width: 316px;
  height: 129px;
  margin-top: -6.5rem;
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow:
    0px 2px 6px rgba(77, 87, 114, 0.08),
    0px -2px 5px rgba(255, 255, 255, 0.1);
  position: relative;
  box-sizing: border-box;
  padding: 1rem;
`;

export const Developer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProjectName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 0.75rem;
`;

export const ProjectFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ProjectFilter = styled.div`
  border-radius: 100px;
  border: 0.5px solid rgba(46, 58, 89, 0.25);
  display: inline-flex;
  height: 22px;
  padding: 0.1rem 0.625rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  width: 260px;
  padding-top: 1.2rem;
  gap: 0.5rem;
`;

export const Divider = styled.hr`
  width: 260px;
  border: 0;
  height: 1px;
  margin: 0px 0;
  background: rgba(46, 58, 89, 0.1);
`;

export const AdditionalInfo = styled.div`
  width: 260px;
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
  width: 300px;
  height: 203px;
  gap: 12px;
`;

export const KeyDevelopmentMilestone = styled.div<{ status: boolean }>`
  padding-top: 8px;
  padding-left: 15px;
  width: 127px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 12px 4px 4px 4px;
  border-top: ${props =>
    props.status
      ? '0.5px solid #4974E0'
      : '0.5px solid rgba(46, 58, 89, 0.20)'};
  border-left: ${props =>
    props.status
      ? '0.5px solid #4974E0'
      : '0.5px solid rgba(46, 58, 89, 0.20)'};
  background: ${props =>
    props.status
      ? 'linear-gradient(0deg, rgba(73, 116, 224, 0.00) 0%, rgba(73, 116, 224, 0.08) 100%)'
      : 'none'};
  color: ${props => (props.status ? COLORS.blue : 'rgba(46, 58, 89, 0.45)')};
  font-family: ${fonts.CoinbaseSans};
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  /* kdm inner white shadow */
  box-shadow: 0px 3px 1px 0px #fff inset;
`;

export const MilestoneLabel = styled.p<{ status: boolean }>`
  margin-top: 3px;
  margin-bottom: 0;
  color: ${props =>
    props.status ? 'rgba(73, 116, 224, 0.45)' : 'rgba(46, 58, 89, 0.25)'};
`;

export const MilestoneIcon = styled.span<{ status: boolean }>`
  color: ${props =>
    props.status ? 'rgba(73, 116, 224, 0.45)' : 'rgba(46, 58, 89, 0.25)'};
  margin-right: 6px;
`;
