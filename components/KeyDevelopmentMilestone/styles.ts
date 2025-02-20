import styled from 'styled-components';
import COLORS from '../../styles/colors';
import * as fonts from '../../styles/fonts';
import { CoinbaseSans } from '../../styles/fonts';

export const Milestone = styled.div<{ $completed: boolean }>`
  padding-top: 0.5rem;
  padding-left: 0.9375rem;
  width: 17rem;
  height: 2.375rem;
  flex-shrink: 0;
  border-radius: 1rem 0.3125rem 0.3125rem 0.3125rem;
  border-top: ${props =>
    props.$completed
      ? `0.0625rem solid ${COLORS.electricBlue}`
      : `0.0625rem solid ${COLORS.grey80}`};
  border-left: ${props =>
    props.$completed
      ? `0.25px solid ${COLORS.electricBlue}`
      : `0.25px solid ${COLORS.grey80}`};
  background: ${props =>
    props.$completed
      ? 'linear-gradient(0deg, rgba(73, 116, 224, 0.00) 0%, rgba(73, 116, 224, 0.08) 100%)'
      : 'none'};
  color: ${props =>
    props.$completed ? COLORS.electricBlue : 'rgba(46, 58, 89, 0.45)'};
  font-family: ${fonts.CoinbaseSans};
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  /* kdm inner white shadow */
  box-shadow: 0px 4px 0px 0px #fff inset;
`;

export const MilestoneLabel = styled.p<{ $status: boolean }>`
  font: ${CoinbaseSans.style};
  margin-top: 0.125rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: ${({ $status }) =>
    $status ? 'rgba(73, 116, 224, 0.45)' : 'rgba(46, 58, 89, 0.3)'};
`;

export const MilestoneTitle = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const KDMInfoHoverContainer = styled.div`
  position: relative;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  gap: 0.25rem;
  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

export const KDMInfoText = styled.div`
  color: ${COLORS.navy};
  visibility: hidden;
  width: 11rem;
  background-color: white;
  text-align: center;
  border-radius: 0.25rem;
  padding: 0.75rem;
  position: absolute;
  bottom: 150%;
  white-space: normal;
  box-shadow:
    0rem 1rem 1.25rem 0rem rgba(46, 58, 89, 0.1),
    0rem 0.0625rem 0.0625rem 0rem rgba(46, 58, 89, 0.15);
  transform: translateX(-5%);
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
