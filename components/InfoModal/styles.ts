import { styled } from 'styled-components';
import { CoinbaseText } from '@/styles/fonts';

// export const InfoModalStyles = styled.div`
//   display: inline-flex;
//   padding: 12px;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   border-radius: 12px;
//   background: #fff;
//   box-shadow:
//     0px 16px 20px 0px rgba(46, 58, 89, 0.1),
//     0px 1px 1px 0px rgba(46, 58, 89, 0.15);

//   z-index: 100;
// `;

export const InfoModalStyles = styled.div`
  position: absolute;
  bottom: 100px; /* Adjust to place it above the button */
  right: 30px; /* Aligns with the button on the right */
  width: 200px; /* Restricts excessive width */
  max-width: 90vw; /* Ensures it adapts to screen size */
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 12px;
  background: #fff;
  box-shadow:
    0px 16px 20px 0px rgba(46, 58, 89, 0.1),
    0px 1px 1px 0px rgba(46, 58, 89, 0.15);
  z-index: 100;
  word-wrap: break-word; /* Ensures long words break properly */
`;

export const InfoModalText = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--navy, rgba(46, 58, 89, 0.75));
  font-family: ${CoinbaseText.style};
  font-size: 10px;
  font-style: normal;
  font-weight: 250;
  line-height: 160%; /* 16px */
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
