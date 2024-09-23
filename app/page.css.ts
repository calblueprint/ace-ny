import { style } from '@vanilla-extract/css';

export const mainStyles = style({
  width: '100%',
  height: '100svh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const imageStyles = style({
  width: '80px',
  height: '80px',
  marginBottom: '0.5rem',
});
