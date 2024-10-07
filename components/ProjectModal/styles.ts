import { CSSProperties } from 'react';

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
};

export const developerStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const additionalInfoStyles: CSSProperties = {
  width: '315px',
};
