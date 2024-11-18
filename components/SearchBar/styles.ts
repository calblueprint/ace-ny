import styled from 'styled-components';
import COLORS from '../../styles/colors';

export const SearchBarPaddingStyles = styled.div`
  display: inline-flex;
  position: absolute;
  top: 1.26rem;
  left: 1.25rem;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(7.5px);
  padding: 0.3rem;
  align-items: center;
  gap: 0.4rem;
  border-radius: 6.25rem;
  border: 0.05rem solid #fff;
  z-index: 3;
`;

export const SearchBarBackgroundStyles = styled.div`
  display: flex;
  width: 21.6rem;
  height: 2.75rem;
  padding: 0.3rem 1.8rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 0.5rem;
  border-radius: 6.25rem;
  background: ${COLORS.white};
  box-sizing: border-box;
`;

export const SearchBarStyles = styled.input`
  padding-left: 0.75rem;
  border: none;
  outline: none;
  box-shadow: none;
  padding-right: 7rem;
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
