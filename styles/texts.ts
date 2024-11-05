'use client';

import styled, { css } from 'styled-components';
import COLORS from './colors';
import { CoinbaseMono, CoinbaseSans, CoinbaseText } from './fonts';

interface TextProps {
  $color?: string;
  $fontWeight?: number | string;
  $align?: 'left' | 'right' | 'center' | 'end' | 'justify' | 'start';
}

const TextStylesCoinbaseMono = css<TextProps>`
  ${CoinbaseMono.style}
  font-weight: ${({ $fontWeight }) => $fontWeight || '700'};
  color: ${({ $color }) => $color || 'black'};
  text-align: ${({ $align }) => $align};
  margin: 0;
`;

const TextStylesCoinbaseSans = css<TextProps>`
  ${CoinbaseSans.style}
  font-weight: ${({ $fontWeight }) => $fontWeight || '700'};
  color: ${({ $color }) => $color || 'black'};
  text-align: ${({ $align }) => $align};
  margin: 0;
`;

const TextStylesCoinbaseText = css<TextProps>`
  ${CoinbaseText.style}
  font-weight: ${({ $fontWeight }) => $fontWeight || '700'};
  color: ${({ $color }) => $color || 'black'};
  text-align: ${({ $align }) => $align};
  margin: 0;
`;

export const Heading1 = styled.h1<TextProps>`
  ${TextStylesCoinbaseMono}
  font-weight: 300;
  color: ${COLORS.grey};
  font-size: 1.375rem;
  font-style: normal;
  line-height: normal;
`;

export const SubHeading1 = styled.h2<TextProps>`
  ${TextStylesCoinbaseSans}
  font-size: 0.875rem;
  color: ${COLORS.grey};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const BodyText1 = styled.p<TextProps>`
  ${TextStylesCoinbaseMono}
  color: ${COLORS.navy};
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 300;
  line-height: 120%;
`;

export const BodyText2 = styled.p<TextProps>`
  ${TextStylesCoinbaseSans}
  color: ${COLORS.navy};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 300;
  line-height: 130%; /* 15.6px */
  letter-spacing: 0.25px;
`;

export const AccentText1 = styled.h4<TextProps>`
  ${TextStylesCoinbaseSans}
  font-size: 3.5rem;
  font-style: normal;
  color: ${COLORS.navy};
  font-weight: 400;
  line-height: normal;
`;

export const AccentText2 = styled.h4<TextProps>`
  ${TextStylesCoinbaseMono}
  color: ${COLORS.navy};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const TagText1 = styled.p<TextProps>`
  ${TextStylesCoinbaseText}
  color: ${COLORS.navy};
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const FilterFont = styled.p<TextProps>`
  ${TextStylesCoinbaseSans}
  color: ${COLORS.navy};
  font-family: 'Coinbase Sans';
  font-size: 0.875;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

/*

export const FilterFont = styled.h1`
  font-family: 'Coinbase Text', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const FilterCategoryFont = styled.h1`
  font-family: 'Coinbase Text', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const LocationFilterFont = styled.h1`
  font-family: 'Coinbase Text', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const ApplyFont = styled.h1`
  font-family: 'Coinbase Text', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const AverageOutputFont = styled.h1`
  font-family: 'Coinbase Text', sans-serif;
  font-size: 9px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const OutputNumbersFont = styled.h1`
  font-family: 'Coinbase Text', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 250;
  line-height: normal;
`;

export const ProjectTitleFont = styled.h1`
  font-family: 'Coinbase Mono', sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ProjectOwnerFont = styled.h1`
  font-family: 'Coinbase Sans', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: 120%;
`;

export const AgreggatorFont = styled.h1`
  font-family: 'SansPlomb_TRIAL', sans-serif;
  font-size: 56px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
*/
