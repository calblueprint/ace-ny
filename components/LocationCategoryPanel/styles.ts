import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const ApplyButtonStyles = styled.button<{ $isActive: boolean }>`
  display: flex;
  width: 100%;
  height: 1.5rem;
  border-radius: 0.25rem;
  background: ${COLORS.electricBlue};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${COLORS.white};
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.50')};
  line-height: normal;
  border: none;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
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

export const ApplyClearButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.05rem;
  width: 100%;
`;

export const PanelContainer = styled.div`
  display: flex;
  min-width: 11.5rem;
  padding: 0.625rem 1.125rem 1rem 1.125rem;
  flex-direction: column;
  align-items: center;
  gap: 1.59375rem;
  border-radius: 12px;
  border-right: 0.5px solid rgba(46, 58, 89, 0.1);
  border-bottom: 1px solid rgba(46, 58, 89, 0.1);
  border-left: 0.5px solid rgba(46, 58, 89, 0.1);
  background: ${COLORS.white};
`;

export const CategoryInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
`;

export const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.3125rem;
  align-self: stretch;
`;

export const ItemContainer = styled.div`
  display: flex;
  max-height: 14rem;
  width: 100%;
  overflow-y: auto;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 0.375rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 1.25rem;
  gap: 2.1875rem;
`;

export const BackArrowWithTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const BackArrowIconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const CloseIconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const SearchIconWithTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Underline = styled.div`
  width: 100%;
  height: 0.03125rem;
  background: ${COLORS.navy50};
`;
