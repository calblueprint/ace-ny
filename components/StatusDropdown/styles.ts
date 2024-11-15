import styled from 'styled-components';
import COLORS from '../../styles/colors';

export const FilterDropdownStyles = styled.div`
  position: relative;
  background: ${COLORS.white};
  width: 11rem;
  border-radius: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const OptionTitleStyles = styled.p<{ color: string }>`
  background: ${({ color }) => `${color}15`};
  border-radius: 0.5rem;
  padding: 0.1rem 0.4rem;
  display: inline-block;
`;

export const CheckboxStyles = styled.input`
  cursor: pointer;
`;

export const ApplyButtonStyles = styled.button<{ isActive: boolean }>`
  width: 10.8125rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  background: ${({ isActive }) =>
    isActive
      ? COLORS.electricBlue
      : 'rgba(73, 116, 224, 0.50)'}; // Active vs Inactive color
  margin-top: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'not-allowed')};
  border: none;
  margin-bottom: 0.5rem;
  width: 88%;
  margin: 1rem auto 0.5rem auto;
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
`;

export const ButtonStyles = styled.button`
  color: rgba(46, 58, 89, 0.85);
  background: ${COLORS.white};
  border: none;
  border-radius: 6.25rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ExitStyles = styled.div`
  margin-left: auto;
  margin-right: 1.1rem;
`;

export const ButtonWithIconStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  padding-top: 1rem;
  cursor: pointer;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: -0.8rem;
  margin-left: 1rem;
`;
export const IconStyles = styled.div`
  width: '3rem',
  height: '3rem',
`;
