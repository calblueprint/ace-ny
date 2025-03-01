'use client';

import { CSSProperties, useEffect, useState } from 'react';
import MapViewScreen from '@/components/MapViewScreen';
import queryProjects from '../api/supabase/queries/query';
import { Project } from '../types/schema';

export default function Home() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[] | []>([]);

  useEffect(() => {
    queryProjects().then(data => {
      setProjects(data);
      setFilteredProjects(data);
      console.log(data);
    });
  }, []);

  return (
    <main style={mainStyles}>
      {projects ? (
        <MapViewScreen
          projects={projects}
          filteredProjects={filteredProjects}
          setFilteredProjects={setFilteredProjects}
        />
      ) : null}
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
