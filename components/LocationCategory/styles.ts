import styled from 'styled-components';

// import COLORS from '@/styles/colors';

export const LocationCategoryContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20px;
`;

export const IconTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LocationCategoryText = styled.p`
  color: rgba(46, 58, 89, 0.75);
  text-align: center;
  font-family: 'Coinbase Text';
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const LocationCategoryIcon = styled.div`
  width: 12px;
  height: 12.316px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Arrow = styled.div`
  width: 14px;
  height: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
