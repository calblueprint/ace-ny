import styled from 'styled-components';
import COLORS from '../../styles/colors';
import * as fonts from '../../styles/fonts';

export const Milestone = styled.div<{ completed: boolean }>`
  padding-top: 8px;
  padding-left: 15px;
  width: 111.5px;
  height: 27.5px;
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
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  /* kdm inner white shadow */
  box-shadow: 0px 3px 1px 0px #fff inset;
`;

export const MilestoneLabel = styled.p<{ status: boolean }>`
  margin-top: 2px;
  margin-bottom: 0;
  color: ${props =>
    props.status ? 'rgba(73, 116, 224, 0.45)' : 'rgba(46, 58, 89, 0.25)'};
`;

export const MilestoneIcon = styled.span<{ status: boolean }>`
  color: ${props =>
    props.status ? 'rgba(73, 116, 224, 0.45)' : 'rgba(46, 58, 89, 0.25)'};
  margin-right: 6px;
`;
