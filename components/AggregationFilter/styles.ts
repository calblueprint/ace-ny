import { styled } from 'styled-components';
import COLORS from '@/styles/colors';
import { CoinbaseMono, CoinbaseSans, CoinbaseText } from '@/styles/fonts';

export const AggregationFilterBackground = styled.div`
  width: 20.6875rem;
  height: 14.6875rem;
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
  width: 20.1875rem;
  height: 14.125rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  margin-top: 10px;
  margin-left: 15px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  border-radius: 40px;
  border-top: 0.3px solid ${COLORS.navy1A};
  border-right: 0.5px solid ${COLORS.navy1A};
  border-bottom: 1px solid ${COLORS.navy1A};
  border-left: 0.5px solid ${COLORS.navy1A};
  background: #fff;
  width: 15.6875rem;
  height: 2.5rem;
  gap: 0px;
  overflow: hidden;
`;

export const Tab = styled.div<{ $isActive: boolean }>`
  display: flex;
  height: 2.5rem;
  align-items: center;
  gap: 10px;
  border-radius: 40px;
  padding: 0 18px;
  background: ${({ $isActive }) =>
    $isActive ? COLORS.electricBlue05 : COLORS.white};
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? COLORS.electricBlue : COLORS.navy)};
  transition:
    background 0.2s ease-in-out,
    color 0.2s ease-in-out;
`;

export const HeaderText = styled.div`
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

export const ContentContainer = styled.div`
  display: flex;
  align-self: center;
  width: 15.625rem;
  height: 9.3125rem;
  flex-direction: column;
`;

export const ContentContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 2px;
  padding-bottom: 9px;
`;

export const TotalText = styled.div`
  color: ${COLORS.navy75};
  font-family: ${CoinbaseMono.style};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;

export const TechnologyStyles = styled.div`
  display: flex;
  gap: 10px;
  line-height: normal;
  align-items: center;
  justify-content: center;
  padding-bottom: 4px;
`;

export const TechnologyWrapperStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding-bottom: 10px;
`;

export const TechnologyRowStyles = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  color: ${COLORS.navy75};
  font-family: ${CoinbaseText.style};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 300;
  justify-content: space-between;
  width: 100%;
`;
