import React from 'react';
import Image from 'next/image';
import { SVGIconProps } from '@/types/schema';
import { ImageStyles } from './styles';

export default function SVGIcon({ src, alt }: SVGIconProps) {
  return (
    <ImageStyles>
      <Image src={src} alt={alt} />
    </ImageStyles>
  );
}
