import { styled } from 'styled-components';

export const AggregationFilterBackground = styled.div`
  width: 331px;
  height: 235px;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(2.5px);
  z-index: 5;
  border-radius: 16px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  // position: absolute; /* Absolute positioning within BottomBarContainer */
  // bottom: 500; /* Position it at the bottom */
  // left: 500;
`;

export const AggregationFilterStyles = styled.div`
  position: relative;
  background: #fff;
  border: none;
  border-radius: 6.25rem;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  border-radius: 12px;
  width: 323px;
  height: 226px;
`;
