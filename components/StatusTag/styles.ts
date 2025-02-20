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

export const InfoHoverContainer = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 0.25rem;
  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

export const InfoHoverText = styled.div`
  visibility: hidden;
  width: 7rem;
  background-color: white;
  text-align: center;
  border-radius: 0.25rem;
  padding: 0.75rem;
  position: absolute;
  bottom: 130%;
  white-space: normal;
  box-shadow:
    0rem 1rem 1.25rem 0rem rgba(46, 58, 89, 0.1),
    0rem 0.0625rem 0.0625rem 0rem rgba(46, 58, 89, 0.15);
  /* Tooltip arrow */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0.625rem;
    border-width: 0.313rem;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;
