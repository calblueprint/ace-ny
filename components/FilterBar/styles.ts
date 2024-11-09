import styled from 'styled-components';
import { FilterHeadingUnused } from '@/styles/texts';

export const FilterContainerStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  margin-right: 15%;
  flex-wrap: wrap;
`;

export const FilterBackgroundStyles = styled.div`
  margin-right: 2%;
  top: 1.5%;
  right: 1.5%;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(7.5px);
  padding: 0.35rem 0.35rem;
  border-radius: 6.25rem;
  z-index: 5;
  border: 0.05rem solid #fff;
  margin-top: 1.5%;
`;

export const FilterButtonStyles = styled.button`
  ${FilterHeadingUnused}
  background: #fff;
  border: none;
  border-radius: 6.25rem;
  cursor: pointer;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
`;
