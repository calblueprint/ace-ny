import { styled } from 'styled-components';

export const AggregationFilterBackground = styled.div`
  position: absolute;
  width: 331px;
  height: 235px;
  bottom: 6.25rem;
  right: 1.875rem;
  display: inline-flex;
  padding: 4px 4px 5px 4px;
  align-items: center;
  gap: 6px;
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(2.5px);
`;

export const AggregationFilterStyles = styled.div`
  position: absolute;

  width: 323px;
  height: 226px;

  bottom: 6.25rem;
  right: 1.875rem;
  display: flex;
  padding: 8px 16px 20px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  border-radius: 12px;
  border-right: 0.5px solid rgba(46, 58, 89, 0.1);
  border-bottom: 1px solid rgba(46, 58, 89, 0.1);
  border-left: 0.5px solid rgba(46, 58, 89, 0.1);
  background: #fff;
`;
