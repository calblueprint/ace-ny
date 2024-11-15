import styled from 'styled-components';
import { CoinbaseMono, CoinbaseSans, CoinbaseText } from '@/styles/fonts';

export const FilterDropdownStyles = styled.div`
  position: relative;
  background: #fff;
  width: 11rem;
  border-radius: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const CategoryTitleStyles = styled.p`
  font-family: ${CoinbaseMono};
  font-size: 0.625rem;
  color: rgba(46, 58, 89, 0.85);
  font-style: normal;
  font-weight: 400;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-bottom: 0.15rem;
`;

export const OptionTitleStyles = styled.p`
  font-family: ${CoinbaseText};
  font-size: 0.75rem;
  color: rgba(46, 58, 89, 0.85);
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const CheckboxStyles = styled.input`
  cursor: pointer;
  // margin-left: auto;
  // margin-right: 1rem;
`;

export const ApplyButtonStyles = styled.button<{ isActive: boolean }>`
  width: 10.8125rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  background: ${({ isActive }) =>
    isActive
      ? '#4974e0'
      : 'rgba(73, 116, 224, 0.50)'}; // Active vs Inactive color
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'not-allowed')};
  color: #fff;
  font-family: ${CoinbaseText};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  margin-bottom: 0.5rem;
  width: 88%;
  margin: 1rem auto 0.5rem auto;
  pointer-events: ${({ isActive }) =>
    isActive ? 'auto' : 'none'}; // Disable clicking when inactive
`;

export const ButtonStyles = styled.button`
  font-family: ${CoinbaseSans};
  color: rgba(46, 58, 89, 0.85);
  font-size: 0.875rem;
  background: #fff;
  border: none;
  border-radius: 6.25rem;
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
