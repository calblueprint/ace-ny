import styled from 'styled-components';
import { CoinbaseText } from '@/styles/fonts';
import COLORS from '../../styles/colors';

export const SearchBarBackgroundStyles = styled.div`
  display: flex;
  width: 20rem;
  height: 2.75rem;
  border-radius: 12px 12px 8px 8px;
  background: ${COLORS.navy30};
  box-sizing: border-box;
  border-bottom: 1px solid var(--navy-50, #949aa9);
`;

export const SearchBarWrapperDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-left: 1rem;
  gap: 0.5rem;
`;

export const SearchExitButton = styled.button<{ $isZero?: boolean }>`
  visibility: ${({ $isZero }) => ($isZero ? 'hidden' : 'visible')};
  padding: 0;
  box-shadow: none;
  border: none;
  background: none;
  cursor: pointer;
`;

export const SearchBarStyles = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  box-shadow: none;
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
