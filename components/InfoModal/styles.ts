import { styled } from 'styled-components';
import COLORS from '@/styles/colors';
import { CoinbaseText } from '@/styles/fonts';

export const InfoModalStyles = styled.div`
  position: absolute;
  bottom: 60px;
  right: 2px;
  width: 13.5rem;
  padding: 20px;
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
  color: ${COLORS.navy75};
  font-family: ${CoinbaseText.style};
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 250;
  line-height: 16px;
  white-space: normal;
  display: inline;
`;

export const InfoModalBoldedText = styled.div`
  color: ${COLORS.electricBlue};
  font-family: ${CoinbaseText.style};
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  display: inline;
`;

export const InfoModalTriangleStyles = styled.div`
  position: absolute;
  width: 1.5625rem;
  height: 0.7719rem;
  flex-shrink: 0;
  z-index: 100;
  bottom: 53px;
  right: 13px;
`;
