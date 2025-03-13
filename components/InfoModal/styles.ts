import { styled } from 'styled-components';
import COLORS from '@/styles/colors';
import { CoinbaseMono, CoinbaseSans, CoinbaseText } from '@/styles/fonts';

export const InfoModalStyles = styled.div`
  position: absolute;
  bottom: 100px;
  right: 30px;
  width: 215px;
  max-width: 90vw;
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

export const InfoModalText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--navy, rgba(46, 58, 89, 0.75));
  font-family: ${CoinbaseText.style};
  font-size: 10px;
  font-style: normal;
  font-weight: 250;
  line-height: 16px;
  padding: 5px 16px;
  white-space: pre-line;
`;

export const InfoModalTriangleStyles = styled.div`
  position: absolute;
  width: 25px;
  height: 12.351px;
  flex-shrink: 0;
  z-index: 100;
  bottom: 93px;
  right: 40px;
`;

export const InfoModalLeftArrowStyles = styled.div`
  width: 12.02px;
  height: 7.425px;
  fill: rgba(46, 58, 89, 0.5);
  cursor: pointer;
  rotate: 180deg;
`;

// export const InfoModalLeftArrowStyles = styled.div`
//   position: absolute; /* Ensures positioning relative to the parent */
//   left: -16px; /* Moves it outside the modal */
//   top: 50%; /* Centers it vertically */
//   transform: translateY(-50%) rotate(180deg); /* Adjusts for exact centering and keeps the rotation */
//   width: 12.02px;
//   height: 7.425px;
//   fill: rgba(46, 58, 89, 0.5);
//   cursor: pointer;
//   z-index: 100;
// `;

export const InfoModalRightArrowStyles = styled.div`
  width: 12.02px;
  height: 7.425px;
  fill: rgba(46, 58, 89, 0.5);
  cursor: pointer;
`;

export const InfoModalCircleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  z-index: 100;
  transform: translateY(5px);
`;

export const HeaderStyles = styled.div`
  color: ${COLORS.lightGray};
  font-family: ${CoinbaseSans.style};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const TitleStyles = styled.div`
  color: ${COLORS.lightGray2};
  font-family: ${CoinbaseMono.style};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const TechnologyStyles = styled.div`
  display: flex;
  gap: 10px;
  color: rgba(46, 58, 89, 0.75);
  font-family: ${CoinbaseText.style};
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
`;

export const TechnologyWrapperStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding-bottom: 10px;
`;

export const InfoModalLegendContent = styled.div`
  width: 191px;
  padding: 8px 12px;
`;

export const InfoModalWrapper = styled.div`
  display: flex;
  align-items: center;
`;
