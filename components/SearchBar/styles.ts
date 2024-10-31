import styled from 'styled-components';
import COLORS from '../../styles/colors';

export const SearchBarPaddingStyles = styled.div`
  display: inline-flex;
  position: absolute;
  top: 3%;
  left: 1.7%;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(7.5px);
  padding: 0.5rem;
  align-items: center;
  gap: 0.4rem;
  border-radius: 0.75rem;
  border: 0.05rem solid #fff;
  z-index: 3;
`;

export const SearchBarBackgroundStyles = styled.div`
  display: flex;
  width: 21.3rem;
  height: 3.1rem;
  padding: 0.3rem 1.8rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: #fff;
  box-sizing: border-box;
`;

export const SearchBarStyles = styled.input`
  border: none;
  outline: none;
  box-shadow: none;
  width: 80%;
  color: #4974e0;
  font-size: 0.9rem;
  font-family: CoinbaseText, sans-serif;
`;

export const IconStyles = styled.div`
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
  color: ${COLORS.blue};
`;
