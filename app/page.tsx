'use client';

import { CSSProperties, useEffect, useState } from 'react';
import Map from '@/components/Map/map';
import queryProjects from '../api/supabase/queries/query';
import { Project } from '../types/schema';

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
      {error ? <div style={errorStyles}>{error}</div> : null}
      {projects ? <Map projects={projects} /> : null}
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

const errorStyles: CSSProperties = {
  color: '#D22B2B',
};
