import styled from 'styled-components';

export const AggregationFilterButtonBackground = styled.button`
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(7.5px);
  padding: 0.25rem;
  z-index: 5;
  border-radius: 100px;
  border: none;
  width: 289px;
  height: 49px;
`;

export const AggregationFilterButtonStyles = styled.button`
  position: relative;
  background: #fff;
  border: none;
  border-radius: 6.25rem;
  cursor: pointer;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 1rem;
  height: 2.2rem;
  border-radius: 100px;
  width: 281px;
  height: 40px;
`;
