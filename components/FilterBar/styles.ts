import styled from 'styled-components';

export const FilterBarStyles = styled.div`
  display: flex;
  position: absolute;
  top: 1.5%;
  right: 1.5%;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(7.5px);
  padding: 0.4rem 0.5rem;
  border-radius: 6.25rem;
  z-index: 1000;
  border: 0.05rem solid #fff;
  margin-top: 1.5%;
`;

export const FilterButtonStyles = styled.button`
  padding: 0.5rem 0.5rem;
  background: #fff;
  border: none;
  border-radius: 6.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Coinbase Sans', sans-serif;
`;
