import { CSSProperties } from 'react';

export const searchBarPaddingStyles: CSSProperties = {
  display: 'inline-flex',
  position: 'absolute',
  top: '3%',
  left: '2%',
  background:
    'var(--background-gradient, linear-gradient(180deg, rgba(250, 250, 250, 0.32) 0%, rgba(238, 238, 238, 0.65) 100%))',
  backdropFilter: 'blur(7.5px)',
  padding: '8px',
  alignItems: 'center',
  gap: '6px',
  borderRadius: '12px',
  border: '0.75px solid #FFF',
  zIndex: 3,
};

export const searchBarBackgroundStyles: CSSProperties = {
  display: 'flex',
  width: '340px',
  height: '50px',
  padding: '5px 29px',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: '0',
  gap: '8px',
  borderRadius: '8px',
  background: '#FFF',
  boxSizing: 'border-box',
};

export const searchBarStyles: CSSProperties = {
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  width: '80%',
  color: '#4974E0',
  fontSize: '14px',
  fontFamily: 'CoinbaseText, sans-serif',
};

export const iconStyles: CSSProperties = {
  width: '18px',
  height: '18px',
  flexShrink: '0',
  fill: 'var(--not-ace-blue, #4974E0)',
};
