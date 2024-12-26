import styled from 'styled-components';
import COLORS from '../../styles/colors';
import * as fonts from '../../styles/fonts';
import { CoinbaseSans } from '../../styles/fonts';

export const Milestone = styled.div<{ completed: boolean }>`
  padding-top: 0.5rem;
  padding-left: 0.9375rem;
  width: 17rem;
  height: 2.375rem;
  flex-shrink: 0;
  border-radius: 1rem 0.3125rem 0.3125rem 0.3125rem;
  border-top: ${props =>
    props.completed
      ? `0.0625rem solid ${COLORS.electricBlue}`
      : `0.0625rem solid ${COLORS.grey80}`};
  border-left: ${props =>
    props.completed
      ? `0.25px solid ${COLORS.electricBlue}`
      : `0.25px solid ${COLORS.grey80}`};
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
  box-shadow: 0px 4px 0px 0px #fff inset;
`;

export const MilestoneLabel = styled.p<{ status: boolean }>`
  font: ${CoinbaseSans.style};
  margin-top: 0.125rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: ${props =>
    props.status ? 'rgba(73, 116, 224, 0.45)' : 'rgba(46, 58, 89, 0.3)'};
`;

export const MilestoneTitle = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
