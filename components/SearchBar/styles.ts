import styled from 'styled-components';
import { CoinbaseText } from '@/styles/fonts';
import COLORS from '../../styles/colors';

export const SearchBarPaddingStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const SearchBarBackgroundStyles = styled.div`
  display: flex;
  width: 20rem;
  height: 2.75rem;
  padding: 0.3rem 1.8rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 0.5rem;
  border-radius: 12px 12px 8px 8px;
  background: ${COLORS.navy30};
  box-sizing: border-box;
  border-bottom: 1px solid var(--navy-50, #949aa9);
`;

export const SearchBarStyles = styled.input`
  padding-left: 0.75rem;
  border: none;
  outline: none;
  box-shadow: none;
  padding-right: 7rem;
  background: none;
  &::placeholder {
    ${CoinbaseText.style}
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    color: ${COLORS.navy85};
  }
  ${CoinbaseText.style}
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: ${COLORS.electricBlue};
`;

export const SearchBarDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SearchExitButton = styled.button<{ $isZero?: boolean }>`
  visibility: ${({ $isZero }) => ($isZero ? 'hidden' : 'visible')};
  padding: 0;
  box-shadow: none;
  border: none;
  background: none;
  cursor: pointer;
`;
