import styled from 'styled-components';
import COLORS from '../../styles/colors';
import * as fonts from '../../styles/fonts';

export const Milestone = styled.div<{ completed: boolean }>`
  padding-top: 0.5rem;
  padding-left: 0.9375rem;
  width: 6.96875rem;
  height: 1.71875rem;
  flex-shrink: 0;
  border-radius: 12px 4px 4px 4px;
  border-top: ${props =>
    props.completed
      ? '0.5px solid #4974E0'
      : '0.5px solid rgba(46, 58, 89, 0.20)'};
  border-left: ${props =>
    props.completed
      ? '0.5px solid #4974E0'
      : '0.5px solid rgba(46, 58, 89, 0.20)'};
  background: ${props =>
    props.completed
      ? 'linear-gradient(0deg, rgba(73, 116, 224, 0.00) 0%, rgba(73, 116, 224, 0.08) 100%)'
      : 'none'};
  color: ${props =>
    props.completed ? COLORS.electricBlue : 'rgba(46, 58, 89, 0.45)'};
  font-family: ${fonts.CoinbaseSans};
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  /* kdm inner white shadow */
  box-shadow: 0px 3px 1px 0px #fff inset;
`;

export const MilestoneLabel = styled.p<{ status: boolean }>`
  margin-top: 0.125rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: ${props =>
    props.status ? 'rgba(73, 116, 224, 0.45)' : 'rgba(46, 58, 89, 0.3)'};
`;

export const KDMInfoHoverContainer = styled.div`
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

export const KDMInfoText = styled.div`
  visibility: hidden;
  width: auto;
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
  left: 50%;
  transform: translateX(-70%);

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
