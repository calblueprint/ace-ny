'use client';

import { CSSProperties, useEffect, useState } from 'react';
import MapViewScreen from '@/components/MapViewScreen';
import queryProjects, {
  queryDefaultImages,
} from '../api/supabase/queries/query';
import { Project } from '../types/schema';

export default function Home() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[] | []>([]);
  const [defaultImageMap, setDefaultImageMap] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    queryProjects().then(data => {
      setProjects(data);
      setFilteredProjects(data);
    });

    queryDefaultImages().then(images => {
      images.forEach(image => {
        defaultImageMap[image.category] = image.default_image;
      });
      setDefaultImageMap(defaultImageMap);
    });
  }, [defaultImageMap]);

  useEffect(() => {
    projects?.forEach(project => {
      project.project_image = project.project_image
        ? project.project_image
        : defaultImageMap[project.renewable_energy_technology];
    });
  }, [defaultImageMap, projects]);

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
