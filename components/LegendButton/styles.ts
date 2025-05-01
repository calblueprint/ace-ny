import { styled } from 'styled-components';

export const LegendButtonBackground = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(7.5px);
  cursor: pointer;
  z-index: 9999;
  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

export const LegendButtonWhiteBackground = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #fff;
  backdrop-filter: blur(7.5px);
  cursor: pointer;
`;

export const InfoHoverText = styled.div`
  visibility: hidden;
  background-color: white;
  position: absolute;
  bottom: 120%;
  white-space: normal;
  box-shadow:
    0px 16px 20px 0px rgba(46, 58, 89, 0.1),
    0px 1px 1px 0px rgba(46, 58, 89, 0.15);

  width: 11.5rem;
  padding: 1rem;
  border-radius: 12px;
  right: 0.625rem;

  /* Tooltip arrow */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 0.65rem;
    border-width: 0.313rem;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;
