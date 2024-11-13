import styled from 'styled-components';
import { FilterHeadingUnused } from '@/styles/texts';

export const FilterContainerStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  margin-right: 3rem;
  flex-wrap: wrap;
`;

export const FilterBackgroundStyles = styled.div<{ isActive: boolean }>`
  margin-right: 0.375rem;
  top: 1.5%;
  right: 1.5%;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(7.5px);
  padding: 0.35rem 0.35rem;
  z-index: 5;
  border: 0.05rem solid #fff;
  margin-top: 0.75rem;
  max-height: ${({ isActive }) => (isActive ? 'auto' : '2rem')};
  border-radius: ${({ isActive }) => (isActive ? '0.5rem' : '6.25rem')};
  transition: height 0.5s ease-in-out;
`;

export const FilterButtonStyles = styled.button`
  ${FilterHeadingUnused}
  position: relative;
  background: #fff;
  border: none;
  border-radius: 6.25rem;
  cursor: pointer;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  color: rgba(46, 58, 89, 0.85);
`;

export const IconStyle = styled.div`
  align-self: center;
  width: 0.8rem;
  height: 0.8rem;
`;
