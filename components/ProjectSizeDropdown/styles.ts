import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const FilterDropdownStyles = styled.div`
  display: flex;
  background: #fff;
  width: 18rem;
  heightL 18.375rem;
  border-radius: 0.5rem;
`;

export const FilterContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.625rem 1.1rem 0.9rem 1.1rem;
  align-content: space-between;
`;

export const FilterIconStyles = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const ButtonWithIconStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
`;

export const ButtonStyles = styled.button`
  display: flex;
  color: rgba(46, 58, 89, 0.85);
  background: ${COLORS.white};
  border: none;
  border-radius: 6.25rem;
  align-items: center;
  cursor: pointer;
`;

export const ExitStyles = styled.div`
  display: flex;
  padding-left: 6.5rem;
`;
