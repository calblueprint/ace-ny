import { styled } from 'styled-components';
import { Arrow } from '@/assets/Aggregation-Filter-Icons/icons';
import COLORS from '@/styles/colors';
import { CoinbaseMono, CoinbaseSans } from '@/styles/fonts';

export const AggregationFilterBackground = styled.div`
  width: 331px;
  height: 235px;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(2.5px);
  z-index: 5;
  border-radius: 16px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AggregationFilterStyles = styled.div`
  position: relative;
  background: #fff;
  border: none;
  border-radius: 6.25rem;
  line-height: normal;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  border-radius: 12px;
  width: 323px;
  height: 226px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`;

export const Header = styled.div`
  display: flex;
  height: 40px;
  align-self: stretch;
  border-radius: 40px;
  border-top: 0px solid rgba(46, 58, 89, 0.1);
  border-right: 1px solid rgba(46, 58, 89, 0.1);
  border-bottom: 1px solid rgba(46, 58, 89, 0.1);
  border-left: 1px solid rgba(46, 58, 89, 0.1);
  background: #fff;
  width: 230px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: 10px;
  margin-left: 15px;
`;

export const Tab = styled.div`
  display: flex;
  height: 40px;
  padding: 14px 22px 14px 20px;
  align-items: center;
  gap: 12px;
  border-radius: 40px;
  background: rgba(73, 116, 224, 0.05);
`;

export const HeaderText = styled.div`
  color: ${COLORS.electricBlue};
  font-family: ${CoinbaseSans.style};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const UpsideDownArrow = styled.div`
  transform: rotate(180deg);
  cursor: pointer;
  align-self: center;
`;

export const TotalText = styled.div`
  color: ${COLORS.navy50};
  font-family: ${CoinbaseMono.style};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
`;
