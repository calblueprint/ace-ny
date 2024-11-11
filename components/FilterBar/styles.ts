import styled from 'styled-components';
import { CoinbaseMono, CoinbaseText } from '@/styles/fonts';
import { FilterHeadingUnused } from '@/styles/texts';

export const FilterContainerStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  margin-right: 15%;
  flex-wrap: wrap;
`;

export const FilterBackgroundStyles = styled.div<{ isActive: boolean }>`
  margin-right: 2%;
  top: 1.5%;
  right: 1.5%;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0.32) 0%,
    rgba(238, 238, 238, 0.65) 100%
  );
  backdrop-filter: blur(7.5px);
  padding: 0.35rem 0.35rem;
  z-index: 5;
  border: 0.05rem solid #fff;
  margin-top: 1.5%;
  max-height: ${({ isActive }) => (isActive ? 'auto' : '2rem')};
  border-radius: ${({ isActive }) => (isActive ? '0.5rem' : '6.25rem')};
  transition: height 0.5s ease-in-out;
`;

export const FilterButtonStyles = styled.button`
  ${FilterHeadingUnused}
  background: #fff;
  border: none;
  border-radius: 6.25rem;
  cursor: pointer;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
`;

export const FilterDropdownStyles = styled.div`
  position: absolute;
  background: #fff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  margin-top: 0.25rem;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: -0.8rem;
  margin-left: 1rem;
`;

export const CategoryTitleStyles = styled.p`
  font-family: ${CoinbaseMono};
  font-size: 0.625rem;
  color: rgba(46, 58, 89, 0.85);
  font-style: normal;
  font-weight: 400;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-bottom: 0.15rem;
`;

export const OptionTitleStyles = styled.p`
  font-family: ${CoinbaseText};
  font-size: 0.75rem;
  color: rgba(46, 58, 89, 0.85);
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const CheckboxStyles = styled.input`
  cursor: pointer;
  margin-left: auto;
  margin-right: 1rem;
`;

export const ApplyButtonStyles = styled.button`
  width: 10.8125rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  background: #4974e0;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-family: ${CoinbaseText};
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  margin-bottom: 0.5rem;
  width: 88%;
  margin: 1rem auto 0.5rem auto;
`;

export const IconStyle = styled.div`
  align-self: center;
  width: 0.8rem;
  height: 0.8rem;
`;
