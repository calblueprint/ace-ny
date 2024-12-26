import styled from 'styled-components';

export const TechnologyTagStyles = styled.div<{ $backgroundColor: string }>`
  border-radius: 5px;
  background: ${({ $backgroundColor }) => `${$backgroundColor}10`};
  display: inline-flex;
  height: 1.2rem;
  padding: 0.1rem 0.625rem;
  align-items: center;
  flex-direction: row;
  gap: 0.375rem;
`;
