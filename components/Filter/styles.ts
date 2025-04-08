import styled from 'styled-components';

export const FilterBackgroundStyles = styled.div<{ $isActive: boolean }>`
  margin-right: 0.5rem;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(7.5px);
  padding: 0.25rem;
  z-index: 5;
  border: 'none';

  margin-top: 1.1rem;
  max-height: ${({ $isActive }) => ($isActive ? 'auto' : '2.2rem')};
  border-radius: ${({ $isActive }) => ($isActive ? '0.8rem' : '6.25rem')};

  transition: height 0.5s ease-in-out;
`;

export const FilterButtonStyles = styled.button`
  position: relative;
  background: #fff;
  border: none;
  border-radius: 6.25rem;
  cursor: pointer;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 1rem;
  color: rgba(46, 58, 89, 0.85);
  height: 2.2rem;
`;

export const IconStyle = styled.div`
  align-self: center;
  width: 0.8rem;
  height: 0.8rem;
`;

export const ExitIconStyle = styled.div`
  margin-left: auto;
  display: flex;
  align-self: center;
  padding-bottom: 0.125rem;
`;
