"use client";

import { CSSProperties, useEffect } from 'react';
import Image from 'next/image';
import BPLogo from '@/assets/images/bp-logo.png';
import queryProjects from './queries/query';

export default function Home() {

  useEffect(() => {
    queryProjects().then((response) => console.log(response))
  }, [])

  return (
    <main style={mainStyles}>
      <Image style={imageStyles} src={BPLogo} alt="Blueprint Logo" />
      <p>Open up app/page.tsx to get started!</p>
    </main>
  );
}

// CSS styles

const mainStyles: CSSProperties = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const imageStyles: CSSProperties = {
  width: '80px',
  height: '80px',
  marginBottom: '0.5rem',
};
