'use client';

import { CSSProperties, useEffect, useState } from 'react';
import Image from 'next/image';
import BPLogo from '@/assets/images/bp-logo.png';
import queryProjects from '../../src/queries/query';

interface Project {
  id: string;
  project_name: string;
  energy_category: string;
  size: number;
  developer: string;
  longitude: number;
  latitude: number;
  project_statues: string;
  county: string;
  town: string;
  region: string;
  state_senate_district: number;
  assembly_district: number;
  project_image: string | null;
  additional_information: string | null;
  key_development_milestones: object | null;
}

// TODO: build some sort of testing page
export default function Home() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    queryProjects()
      .then(data => {
        setProjects(data.projects);
      })
      .catch(err => setError(err));
  }, []);

  return (
    <main style={mainStyles}>
      <Image style={imageStyles} src={BPLogo} alt="Blueprint Logo" />
      <p>Open up app/page.tsx to get started!</p>
      <p>
        <b>Projects:</b>
      </p>
      {projects ? (
        projects?.map(project => {
          return <div key={project.id}>{project.project_name}</div>;
        })
      ) : (
        <div>Loading...</div>
      )}
      {error ? <div style={errorStyles}>{error}</div> : null}
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

const errorStyles: CSSProperties = {
  color: '#D22B2B',
};
