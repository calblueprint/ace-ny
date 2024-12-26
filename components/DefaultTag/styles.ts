import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const DefaultTagStyles = styled.div`
  display: flex;
  gap: 0.625rem;
  height: 1.2rem;
  padding: 0.1rem 0.625rem;
  align-items: center;
  flex-direction: row;
  gap: 0.375rem;
  border-radius: 5px;
  background: ${COLORS.electricBlue10};
`;
