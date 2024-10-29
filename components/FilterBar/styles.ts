import { CSSProperties } from 'react';

export const filterBarStyles: CSSProperties = {
  display: 'flex',
  position: 'absolute',
  top: '1.5%',
  right: '1.5%',
  // alignItems: 'center',
  background:
    'var(--background-gradient, linear-gradient(180deg, rgba(250, 250, 250, 0.32) 0%, rgba(238, 238, 238, 0.65) 100%))',
  backdropFilter: 'blur(7.5px)',
  padding: '6px 8px',
  borderRadius: '100px',
  zIndex: 1000,
  border: '0.75px solid #FFF',
  marginTop: '1.5%',
};

export const filterButtonStyles: CSSProperties = {
  padding: '8px 8px',
  background: '#f0f0f0',
  border: 'none',
  borderRadius: '100px',
  cursor: 'pointer',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontFamily: '"Coinbase Sans", sans-serif',
  // borderRight: "0.5px solid rgba(46, 58, 89, 0.10)",
  // borderBottom: "1px solid rgba(46, 58, 89, 0.10)",
  // borderLeft: "0.5px solid rgba(46, 58, 89, 0.10)",
};

export const filterButtonHoverStyles: CSSProperties = {
  background: '#e0e0e0',
};
