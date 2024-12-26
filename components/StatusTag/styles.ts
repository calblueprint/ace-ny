import styled from 'styled-components';
import COLORS from '@/styles/colors';

const BaseTagStyle = styled.div`
  display: flex;
  gap: 0.625rem;
  height: 1.2rem;
  padding: 0.1rem 0.625rem;
  align-items: center;
  flex-direction: row;
  gap: 0.375rem;
  border-radius: 5px;
`;

export const TagStyle = styled(BaseTagStyle)<{ $color: string }>`
  background: ${({ $color }) => `${$color}10`};
`;

export const CODTagStyles = styled(BaseTagStyle)`
  background: ${COLORS.electricBlue10};
`;

export const AllTagStyles = styled.div`
  padding-left: 0.1rem;
  gap: 0.35rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
