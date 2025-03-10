import { CSSProperties } from 'react';
import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const modalOverlayStyles: CSSProperties = {
  width: '21.25rem',
  height: '100%',
  backgroundColor: 'transparent',
};

export const modalContentStyles: CSSProperties = {
  display: 'flex',
  top: '1.25rem',
  left: '1.25rem',
  width: '90vw',
  maxWidth: '22.25rem',
  height: '95vh',
  borderRadius: '1.5rem',
  border: 'none',
  background:
    'linear-gradient(180deg, rgba(250, 250, 250, 0.32) 0%, rgba(238, 238, 238, 0.65) 100%)',
  backdropFilter: 'blur(7.5px)',
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  boxSizing: 'border-box',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
};

export const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--Spacing-Small, 1.2rem);
  height: 100%;
  background: ${COLORS.white};
  width: 21.6rem;
  overflow-y: auto;
  gap: 0.75rem;
`;

export const AllProjectsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 13rem;
  gap: 0.4rem;
  align-items: center;
`;

export const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 0.93rem 0.625rem 0.625rem 0.8125rem;
`;

export const ProjectItemsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const SortByButton = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  background: ${COLORS.navy30};
  padding: 0.2rem 0.5rem;
  border-radius: 1.25rem;
  gap: 0.3rem;

  margin-bottom: 3px;
`;

export const Headers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 102%;
`;

export const DropdownMenu = styled.div`
  display: flex;
  position: absolute;
  width: 120px;
  height: 152px;
  flex-direction: column;
  padding: 6px 8px;
  align-items: flex-start;
  gap: 4px;
  flex-shrink: 0;
  border-radius: 5px;
  border-right: 0.5px solid rgba(46, 58, 89, 0.08);
  border-bottom: 1.5px solid rgba(46, 58, 89, 0.08);
  border-left: 0.5px solid rgba(46, 58, 89, 0.08);
  background: #fafafb;
  box-shadow: 0px -2px 5px 0px #fff;

  z-index: 3;
  right: 0;
`;

export const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2px 6px 2px 4px;
  gap: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--navy, rgba(46, 58, 89, 0.76));
  font-family: 'Coinbase Text', sans-serif;
  font-size: 0.688rem;
  letter-spacing: 0.22px;

  &:hover {
    background: rgba(73, 116, 224, 0.05);
    color: var(--not-ace-blue, #4974e0);
    border-radius: 5px;
  }
`;
