import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { CoinbaseMono } from '@/styles/fonts';

export const DownloadButton = styled.button`
  display: flex;
  width: 100px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: #fafafb;
  border-radius: 20px;
  border: none;
  cursor: pointer;
`;

export const DownloadText = styled.div`
  color: ${COLORS.navy75};
  font-family: ${CoinbaseMono.style};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;
