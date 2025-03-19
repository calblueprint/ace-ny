import { styled } from 'styled-components';
import COLORS from '@/styles/colors';
import { CoinbaseMono, CoinbaseSans, CoinbaseText } from '@/styles/fonts';

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
  margin-top: 10px;
  margin-left: 15px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  border-radius: 40px;
  border-top: 0px solid rgba(46, 58, 89, 0.1);
  border-right: 1px solid rgba(46, 58, 89, 0.1);
  border-bottom: 1px solid rgba(46, 58, 89, 0.1);
  border-left: 1px solid rgba(46, 58, 89, 0.1);
  background: #fff;
  width: 251px;
  height: 40px;
  gap: 0px;
  overflow: hidden;
`;

export const Tab = styled.div<{ $isActive: boolean }>`
  display: flex;
  height: 40px;
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
  width: 250px;
  height: 149px;
  flex-direction: column;
`;

export const ContentContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const TotalText = styled.div`
  color: ${COLORS.navy50};
  font-family: ${CoinbaseMono.style};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;

export const DownloadText = styled.div`
  color: ${COLORS.navy};
  font-family: ${CoinbaseMono.style};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;

export const DownloadButton = styled.button`
  display: flex;
  flex-direction: col;
  width: 85px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: #fafafb;
  border-radius: 20px;
  border: none;
  cursor: pointer;
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
  // padding-top: 10px;
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
