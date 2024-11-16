import { CSSProperties } from 'react';
import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const StyledProjectItem = styled.button`
  display: flex;
  align-items: center;
  width: 20rem;
  height: 7.625rem;
  flex-shrink: 0;
  border-radius: 18px;
  border-top: 1px solid rgba(46, 58, 89, 0.1);
  border-bottom: 1px solid rgba(46, 58, 89, 0.1);
  border-left: 0;
  border-right: 0;
  background: rgba(255, 255, 255, 0.9);
  padding-top: 0;
  padding-bottom: 0;
  &:hover {
    border: 1px solid rgba(46, 58, 89, 0.05);
    background: ${COLORS.white};
    box-shadow:
      0px 1px 4px 0px rgba(77, 87, 114, 0.4),
      0px -2px 6px 0px rgba(255, 255, 255, 0.1);
  }
`;

export const projectImageStyles: CSSProperties = {
  width: '7.75rem',
  height: '6.75rem',
  borderRadius: '0px 12px 12px 0px',
  opacity: '0.9',
  background: 'url(<path-to-image>) lightgray 50% / cover no-repeat',
  marginLeft: '-0.9375rem',
};

export const ProjectInfo = styled.div`
  width: 12.625rem;
  height: 6.75rem;
  border-radius: 0px 7.5px 7.5px 0px;
  border-right: 1px solid #eff0f3;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 0px 4px 0px rgba(255, 255, 255, 0.25);
  padding-left: 0.875rem;
  z-index: 2;
`;

export const ProjectName = styled.div`
  margin-top: 1.5rem;
  text-align: left;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 10.3rem;
`;

export const ProjectStatus = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.3125rem;
`;

export const ProjectSizeAndType = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

export const ProjectSize = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const ProjectType = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
