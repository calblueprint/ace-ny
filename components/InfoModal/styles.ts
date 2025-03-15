import { styled } from 'styled-components';
import COLORS from '@/styles/colors';
import { CoinbaseMono, CoinbaseSans, CoinbaseText } from '@/styles/fonts';

export const InfoModalStyles = styled.div`
  position: absolute;
  bottom: 6.25rem;
  right: 1.875rem;
  width: 14.6875rem;
  height: 20.625rem;
  padding: 16px 16px;
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

export const InfoModalText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--navy, rgba(46, 58, 89, 0.75));
  font-family: ${CoinbaseText.style};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 250;
  line-height: 16px;
  padding: 5px 16px;
  white-space: normal;
  display: inline;
  padding-bottom: 15px;
  margin-top: -5px;
`;

export const InfoModalBoldedText = styled.div`
  color: ${COLORS.electricBlue};
  font-family: ${CoinbaseText.style};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  display: inline;
`;

export const InfoModalBoldedUnderlinedText = styled(InfoModalBoldedText)`
  text-decoration: underline;
  cursor: pointer;
`;

export const InfoModalTriangleStyles = styled.div`
  position: absolute;
  width: 1.5625rem;
  height: 0.7719rem;
  flex-shrink: 0;
  z-index: 100;
  bottom: 93px;
  right: 40px;
`;

export const InfoModalRightArrowStyles = styled.div`
  width: 0.7513rem;
  height: 0.4641rem;
  fill: ${COLORS.navy50};
  cursor: pointer;
`;

export const InfoModalLeftArrowStyles = styled(InfoModalRightArrowStyles)`
  rotate: 180deg;
  position: relative;
  top: 10px;
  right: 3px;
`;

export const InfoModalCircleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  z-index: 100;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

export const HeaderStyles = styled.div`
  color: ${COLORS.navy85};
  font-family: ${CoinbaseSans.style};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const TitleStyles = styled.div`
  color: ${COLORS.navy50};
  font-family: ${CoinbaseMono.style};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  padding-top: 10px;
  padding-bottom: 12px;
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
  padding-left: 10px;
  padding-bottom: 4px;
`;

export const TechnologyWrapperStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding-bottom: 10px;
`;

export const InfoModalLegendContent = styled.div`
  width: 11.9375rem;
  padding: 8px 12px;
`;

export const InfoModalWrapper = styled.div`
  display: flex;
  align-items: center;
`;
