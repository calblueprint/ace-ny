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

export const projectContainerStyles: CSSProperties = {
  position: 'relative', // Positions children absolutely within this container
  width: '390px',
  height: '300px', // Adjust height to fit content + search bar
  overflow: 'hidden',
};

export const projectImageStyles: CSSProperties = {
  position: 'absolute', // Allows the image to be placed behind other content
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Ensures the image fills the container without distortion
  zIndex: 1, // Lower z-index to push the image behind
};
