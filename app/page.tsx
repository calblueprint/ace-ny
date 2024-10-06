import { CSSProperties } from 'react';
import Image from 'next/image';
import BPLogo from '@/assets/images/bp-logo.png';
import ProjectModal from '@/components/ProjectModal';

export default function Home() {
  return (
    <main style={mainStyles}>
      <Image style={imageStyles} src={BPLogo} alt="Blueprint Logo" />
      <ProjectModal></ProjectModal>
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
