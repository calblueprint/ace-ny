import styled from 'styled-components';
import COLORS from '../../styles/colors';

export const FilterDropdownStyles = styled.div`
  position: relative;
  background: ${COLORS.white};
  width: 10rem;
  border-radius: 0.5rem;
`;

export const FilterContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.625rem 0.9375rem 0.9rem 0.9375rem;
  align-content: space-between;
`;

export const OptionTitleStyles = styled.p<{ color: string }>`
  background: ${({ color }) => `${color}10`};
  border-radius: 0.3rem;
  padding: 0.1rem 0.4rem;
  display: inline-block;
`;

export const CheckboxStyles = styled.input`
  cursor: pointer;
  margin-left: 0rem;
`;

export const ApplyButtonStyles = styled.button<{ $isActive: boolean }>`
  width: 8rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  background: ${COLORS.electricBlue};
  opacity: ${({ $isActive }) =>
    $isActive ? '1' : '0.5'}; // Active vs Inactive color
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
  border: none;
  margin: 1.4rem auto auto auto;
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

export const ExitStyles = styled.div`
  margin-left: auto;
  display: flex;
  align-self: center;
  padding-bottom: 0.125rem;
`;

export const ButtonWithIconStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0rem;
  cursor: pointer;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: -1.5rem;
`;
export const IconStyles = styled.div`
  width: 3rem;
  height: 3rem;
`;

export const ClearButtonStyles = styled.button<{ $isActive: boolean }>`
  width: 8rem;
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
  margin: 0.375rem auto auto auto;
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
`;
