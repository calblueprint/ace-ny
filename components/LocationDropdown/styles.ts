import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const LocationContentDiv = styled.div`
  display: flex;
  width: 11.75rem;
  padding: 0.625rem 1.125rem 1rem 1.125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;

export const LocationStyleDiv = styled.div`
  border-radius: 12px;
  border-right: 0.5px solid rgba(46, 58, 89, 0.1);
  border-bottom: 1px solid rgba(46, 58, 89, 0.1);
  border-left: 0.5px solid rgba(46, 58, 89, 0.1);
  background: #fff;
`;

export const CategoryComponentContainer = styled.div`
  display: flex;
  width: 11.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.188rem;
  cursor: pointer;
`;

export const ButtonStyles = styled.button`
  display: flex;
  color: rgba(46, 58, 89, 0.85);
  background: ${COLORS.white};
  border: none;
  border-radius: 100px;
  align-items: center;
  cursor: pointer;
`;

export const ButtonWithIconStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
`;

export const LocationIconWithTestContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const FilterIconStyles = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const IconStyles = styled.div`
  width: '3rem',
  height: '3rem',
`;

export const CollapseStyles = styled.div`
  display: flex;
  padding-left: 1.5rem;
  padding-bottom: 0.125rem;
`;

export const ClearButtonStyles = styled.button<{ $isActive: boolean }>`
  width: 100%;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border-style: solid;
  border-width: 0.09rem;
  border-color: ${COLORS.electricBlue};
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.5')};
  background: ${COLORS.white};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem auto auto auto;
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
`;
