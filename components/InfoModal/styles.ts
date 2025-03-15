import { styled } from 'styled-components';
import COLORS from '@/styles/colors';
import { CoinbaseMono, CoinbaseSans, CoinbaseText } from '@/styles/fonts';

export const InfoModalStyles = styled.div`
  position: absolute;
  bottom: 6.25rem;
  right: 1.875rem;
  width: 14.6875rem;
  height: 20.625rem;
  padding: 1rem 1rem;
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
  line-height: 1rem;
  padding: 0.3125rem 1rem;
  white-space: normal;
  display: inline;
  padding-bottom: 0.9375rem;
  margin-top: -0.3125rem;
`;

export const InfoModalBoldedText = styled.div`
  color: ${COLORS.electricBlue};
  font-family: ${CoinbaseText.style};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1rem;
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
  bottom: 5.8125rem;
  right: 2.5rem;
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
  top: 0.625rem;
  right: 0.1875rem;
`;

export const InfoModalCircleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4375rem;
  z-index: 100;
  position: absolute;
  bottom: 1.25rem;
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
  padding-top: 0.625rem;
  padding-bottom: 0.75rem;
`;

export const TechnologyStyles = styled.div`
  display: flex;
  gap: 0.625rem;
  color: ${COLORS.navy75};
  font-family: ${CoinbaseText.style};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  align-items: center;
  justify-content: center;
  padding-left: 0.625rem;
  padding-bottom: 0.25rem;
`;

export const TechnologyWrapperStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding-bottom: 0.625rem;
`;

export const InfoModalLegendContent = styled.div`
  width: 11.9375rem;
  padding: 0.5rem 0.75rem;
`;

export const InfoModalWrapper = styled.div`
  display: flex;
  align-items: center;
`;
