import { CSSProperties } from 'react';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { CoinbaseSans, CoinbaseText } from '@/styles/fonts';

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
  color: ${COLORS.navy};
  font-family: ${CoinbaseSans};
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 1.75rem;
  text-align: left;
`;

export const ProjectStatus = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.3125rem;
  color: rgba(46, 58, 89, 0.75);
  font-family: ${CoinbaseText};
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 0.3125rem;
`;

export const ProjectSizeAndType = styled.div`
  display: flex;
  gap: 0.5rem;
  color: ${COLORS.navy};
  font-family: ${CoinbaseSans};
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 1.625rem;
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
