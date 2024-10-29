'use client';

import { CSSProperties, useEffect, useState } from 'react';
import queryProjects from '../../api/supabase/queries/query';
import Map from '../../components/Map/map';
import { AccentText1, Heading1, SubHeading1 } from '../../styles/texts';
import { Project } from '../../types/schema';

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
      <Heading1>RIPTIDE STORAGE</Heading1>
      <SubHeading1>RIPTIDE STORAGE</SubHeading1>
      <AccentText1>1,200</AccentText1>
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
      {projects ? <Map projects={projects} /> : null}
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

const errorStyles: CSSProperties = {
  color: '#D22B2B',
};
