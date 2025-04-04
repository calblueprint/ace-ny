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
