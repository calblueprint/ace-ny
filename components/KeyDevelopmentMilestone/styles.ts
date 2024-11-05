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
  color: ${props => (props.completed ? COLORS.blue : 'rgba(46, 58, 89, 0.45)')};
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
    props.status ? 'rgba(73, 116, 224, 0.45)' : 'rgba(46, 58, 89, 0.25)'};
`;
