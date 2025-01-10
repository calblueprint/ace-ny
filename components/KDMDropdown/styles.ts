import { styled } from 'styled-components';
import COLORS from '@/styles/colors';

export const KDMContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 16.95rem;
  gap: 0.875rem;
  padding: 1.25rem 1.4rem;
  border-radius: 12px 12px 8px 8px;
  border: 1px solid rgba(46, 58, 89, 0.05);
  box-shadow: 0px -2px 5px 0px rgba(255, 255, 255, 0.1);
`;

export const Header = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  /* remove button's complete styling */
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const CompletionIndicatorTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background: ${COLORS.electricBlue10};
  padding: 0.2rem 0.35rem;
  gap: 0.25rem;
`;

export const ProgressBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ProgressBox = styled.div<{ $completed: boolean }>`
  width: 2.625rem;
  height: 0.5rem;
  border-radius: 2px;
  background: ${COLORS.electricBlue};
  opacity: ${props => (props.$completed ? '0.85' : '0.5')};
  box-shadow: ${props =>
    props.$completed
      ? '0px 3px 4px 0px rgba(46, 58, 89, 0.10)'
      : '0px 2px 4px 0px rgba(73, 116, 224, 0.10) inset'};
`;
