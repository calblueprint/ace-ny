import { styled } from 'styled-components';
import COLORS from '@/styles/colors';
import { CoinbaseMono, CoinbaseText } from '@/styles/fonts';

export const LegendStyles = styled.div`
  position: absolute;
  bottom: 3.75rem;
  right: 6.875rem;
  width: 19.85rem;
  padding: 16px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  background: #fff;
  box-shadow:
    0px 16px 20px 0px rgba(46, 58, 89, 0.1),
    0px 1px 1px 0px rgba(46, 58, 89, 0.15);
  z-index: 100;
  word-wrap: break-word;
`;

export const LegendTriangleStyles = styled.div`
  position: absolute;
  width: 1.5625rem;
  height: 0.7719rem;
  flex-shrink: 0;
  z-index: 100;
  bottom: 3.313rem;
  right: 7.563rem;
`;

export const TitleStyles = styled.div`
  color: ${COLORS.navy50};
  font-family: ${CoinbaseMono.style};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
`;

export const LineStyles = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`;

export const TechnologyStyles = styled.div`
  display: flex;
  gap: 10px;
  color: ${COLORS.navy75};
  font-family: ${CoinbaseText.style};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  align-items: center;
  justify-content: center;
`;

export const TechnologyWrapperStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
`;

export const LegendContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
`;
