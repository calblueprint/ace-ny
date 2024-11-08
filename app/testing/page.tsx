'use client';

import { CSSProperties } from 'react';
import ProjectItem from '@/components/ProjectItem';

export default function Home() {
  return (
    <main style={mainStyles}>
      <ProjectItem project_id={1}></ProjectItem>
    </main>
  );
}

// CSS styles

const mainStyles: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};
