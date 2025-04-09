import styled from 'styled-components';

export const SortByItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2px 6px 2px 4px;
  gap: 10px;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background: rgba(73, 116, 224, 0.05);
    border-radius: 5px;

    p {
      color: var(--not-ace-blue, #4974e0);
    }
  }
`;
