import { CSSProperties } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { AccentText1, Heading1 } from '../../styles/texts';

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

export const ProjectOverview = styled.div`
  width: 316px;
  height: 129px;
  margin-top: 152px;
  // flex-shrink: 0;
  border-radius: 8px;
  background: ${COLORS.white};
  box-shadow:
    0px 2px 6px rgba(77, 87, 114, 0.08),
    0px -2px 5px rgba(255, 255, 255, 0.1);
  position: relative;
  padding: 15px; /* Add padding here */
  box-sizing: border-box; /* Include padding in the width and height */
`;

export const Developer = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 2;
  color: ${COLORS.grey};
  // font-size: 10px;
  // font-style: normal;
  // font-weight: 400;
  // line-height: 120%; /* 12px */
`;

export const ProjectName = styled.div`
  overflow: hidden;
  color: ${COLORS.navy};
  text-overflow: ellipsis;
  // font-size: 22px;
  // font-style: normal;
  // font-weight: 400;
  //line-height: normal;
  padding-bottom: 15px;

  ${Heading1} {
    //display: inline;
    margin: 0;
  }
`;

export const ProjectFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProjectFilter = styled.div`
  color: ${COLORS.navy};
  border-radius: 100px;
  border: 0.5px solid rgba(46, 58, 89, 0.25);
  display: inline-flex;
  height: 22px;
  padding: 3px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const CloseButton = styled.button`
  //position: absolute;
  box-shadow: none;
  background: none;
  border: none;
`;

export const ProjectSize = styled.div`
  overflow: hidden;
  color: rgba(46, 58, 89, 0.85);
  text-overflow: ellipsis;
  // /* Accent Text 1 */
  // font-family: SansPlomb_TRIAL;
  // font-size: 56px;
  // font-style: normal;
  // font-weight: 400;
  // line-height: normal;
  padding-top: 20px;

  ${AccentText1} {
    margin: 0;
  }
`;

export const Divider = styled.hr`
  width: 260.002px;
  border: 0;
  height: 1px;
  background-color: rgba(46, 58, 89, 0.2); /* Adjust color as needed */
  margin: 10px 0; /* Add space above and below */
  background: ${COLORS.lightGrey};
`;

export const AdditionalInfo = styled.div`
  width: 260px;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 12px */
  color: ${COLORS.grey};
  padding: 20px;
  font-family: 'Coinbase Mono';
`;

export const AdditionalText = styled.div`
  padding-top: 15px;
  color: ${COLORS.navy};
  font-family: 'Coinbase Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 130%;
  letter-spacing: 0.25px;
`;
