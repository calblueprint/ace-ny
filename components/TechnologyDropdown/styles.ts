import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const FilterDropdownStyles = styled.div`
  display: flex;
  background: #fff;
  width: 13.8rem;
  border-radius: 0.5rem;
`;

export const FilterContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.625rem 1.5rem 0.9rem 1.5rem;
  align-content: space-between;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  column-gap: 0.875rem;
  margin-top: 0.35rem;
`;

export const CheckboxStyles = styled.input`
  display: flex;
  cursor: pointer;
  margin-left: auto;
`;

export const ApplyButtonStyles = styled.button<{ isActive: boolean }>`
  display: flex;
  width: 10.81rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  background: ${COLORS.electricBlue};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${COLORS.white};
  opacity: ${({ isActive }) => (isActive ? '1' : '0.50')};
  line-height: normal;
  border: none;
  margin: 1.3rem auto 0 auto;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'not-allowed')};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
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
  padding-left: 1.5rem;
`;

export const ButtonWithIconStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export const IconStyles = styled.div`
  width: '3rem',
  height: '3rem',
`;
