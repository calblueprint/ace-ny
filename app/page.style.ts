'use client';

import NextImage from 'next/image';
import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled(NextImage)`
  width: 80px;
  height: 80px;
  margin-bottom: 0.5rem;
`;
