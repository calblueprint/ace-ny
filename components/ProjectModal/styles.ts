import { CSSProperties } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import COLORS from '../../styles/colors';

export const ModalOverlay = styled.div`
  width: 310px;
  height: 100%;
`;

export const ModalContent = styled(Modal)`
  display: flex;
  width: 360px;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
`;

export const SearchBar = styled.div`
  width: 340px;
  height: 50px;
  display: flex;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid rgba(46, 58, 89, 0.5);
  background: ${COLORS.white};
  box-shadow: 0px 4px 5px rgba(255, 255, 255, 0.25);
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ProjectDetailsBorder = styled.div`
  width: 356px;
  height: 82%;
  border-radius: var(--Spacing-Small, 16px);
  border: 0.75px solid var(--WorldPeas-White, #fff);
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(7.5px);
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--Spacing-Small, 16px);
  height: 100%;
  background: ${COLORS.white};
  width: 340px;
`;

export const projectImageStyles: CSSProperties = {
  position: 'absolute',
  width: '340px',
  height: '250px',
  objectFit: 'cover',
  borderRadius: '8px 8px 0px 0px',
};

export const ProjectName = styled.div`
  width: 316px;
  height: 129px;
  margin-top: 152px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow:
    0px 2px 6px rgba(77, 87, 114, 0.08),
    0px -2px 5px rgba(255, 255, 255, 0.1);
  position: relative;
  padding: 20px; /* Add padding here */
  box-sizing: border-box; /* Include padding in the width and height */
`;

export const Developer = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 2;

  color: ${COLORS.lightGrey}; //rgba(46, 58, 89, 0.65);
  /* Body Text 1 */
  font-family: 'Coinbase Mono';
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 12px */
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
`;

export const AdditionalInfo = styled.div`
  width: 315px;
`;
