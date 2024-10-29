import { CSSProperties } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import * as fonts from '../../styles/fonts';

// OLD CSS NEEDS TO BE CHANGED TO STYLED COMPONENTS
export const modalOverlayStyles: CSSProperties = {
  width: '310px',
  height: '100%',
};

export const modalContentStyles: CSSProperties = {
  display: 'flex',
  width: '360px',
  height: '100%',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  flexShrink: 0,
  flexDirection: 'column',
  alignItems: 'center',
};

export const projectContainerStyles: CSSProperties = {
  position: 'relative',
  width: '360px',
  height: '300px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const projectImageStyles: CSSProperties = {
  position: 'absolute',
  width: '359px',
  height: '269px',
  objectFit: 'cover',
};

export const searchBarStyles: CSSProperties = {
  width: '310px',
  height: '50px',
  display: 'flex',
  flexShrink: '0',
  borderRadius: '8px',
  border: '1px solid rgba(46, 58, 89, 0.50)',
  background: 'var(--WorldPeas-White, #FFF)',
  boxShadow: '0px 4px 5px 0px rgba(255, 255, 255, 0.25)',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
  position: 'relative',
};

export const projectNameStyles: CSSProperties = {
  width: '315px',
  height: '135px',
  marginTop: '152px',
  flexShrink: '0',
  borderRadius: '8px',
  background: 'var(--WorldPeas-White, #FFF)',
  boxShadow:
    '0px 2px 6px 0px rgba(77, 87, 114, 0.08), 0px -2px 5px 0px rgba(255, 255, 255, 0.10)',
  position: 'relative',
  padding: '10px',
};

export const developerStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  zIndex: 2,
};

export const closeButtonStyles: CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  zIndex: 3,
};

export const additionalInfoStyles: CSSProperties = {
  width: '315px',
};

// STYLED COMPONENTS
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
