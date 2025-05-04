import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const FilterDropdownStyles = styled.div`
  display: flex;
  background: #fff;
  width: 13rem;
  border-radius: 0.5rem;
`;

export const FilterContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.625rem 1.1rem 0.9rem 1.1rem;
  align-content: space-between;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  column-gap: 0.875rem;
  margin-top: 0.35rem;
  cursor: pointer;
`;

export const CheckboxStyles = styled.input`
  display: flex;
  cursor: pointer;
  margin-left: auto;
`;

export const ApplyButtonStyles = styled.button<{ $isActive: boolean }>`
  display: flex;
  width: 10.81rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  background: ${COLORS.electricBlue};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${COLORS.white};
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.50')};
  line-height: normal;
  border: none;
  margin: 1rem auto 0 auto;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
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

export const CollapseStyles = styled.div`
  display: flex;
  padding-left: 2.21rem;
`;

export const ButtonWithIconStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 0.09rem;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
`;

export const FilterIconStyles = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const IconStyles = styled.div`
  width: '3rem',
  height: '3rem',
`;

export const ClearButtonStyles = styled.button<{ $isActive: boolean }>`
  width: 10.81rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border-style: solid;
  border-width: 0.09rem;
  border-color: ${COLORS.electricBlue};
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.5')};
  background: ${COLORS.white};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem auto auto auto;
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
`;
