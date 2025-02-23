import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { CoinbaseText } from '@/styles/fonts';
import { FilterCategoryText1 } from '@/styles/texts';

export const FilterDropdownStyles = styled.div`
  display: flex;
  background: #fff;
  width: 18.25rem;
  height: 18.375rem;
  border-radius: 0.5rem;
`;

export const FilterContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.9rem 1.1rem 0.9rem 1.3rem;
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

export const BlueTextStyles = styled.span`
  color: ${COLORS.electricBlue};
`;

export const FilterCategoryText1WithPadding = styled(FilterCategoryText1)`
  font-size: 0.625rem;
  padding-top: 0.3125rem;
`;

export const Box = styled.div`
  width: 7.5rem;
  height: 3.1875rem;
  border-radius: 0.25rem;
  border: 0.015625rem solid ${COLORS.electricBlue};
`;

export const BoxContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0;
`;

export const Label = styled.div`
  color: ${COLORS.electricBlue};
  font-size: 0.5625rem;
  font-family: ${CoinbaseText.style};
  font-weight: 600;
  word-wrap: break-word;
  margin-top: 0.75rem;
  padding-left: 0.625rem;
  letter-spacing: 0.03125rem;
`;

export const Value = styled.div`
  color: ${COLORS.navy};
  font-size: 0.875rem;
  font-family: ${CoinbaseText.style};
  font-weight: 250;
  word-wrap: break-word;
  margin-top: 0.1875rem;
  padding-left: 0.625rem;
`;

export const ApplyButtonStyles = styled.button<{ $isActive: boolean }>`
  display: flex;
  width: 16rem;
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
  margin: 0.1rem auto 0 auto;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
`;
