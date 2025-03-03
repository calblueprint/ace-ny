'use client';

import React, { useEffect, useState } from 'react';
import queryProjects from '@/api/supabase/queries/query';
import DownloadData from '@/components/DownloadData';
import { Project } from '@/types/schema';

export default function TestingPage() {
  const [filteredProjects, setFilteredProjects] = useState<Project[] | []>([]);

  useEffect(() => {
    queryProjects().then(data => {
      setFilteredProjects(data);
    });
  }, []);

  return (
    <div>
      <DownloadData filteredProjects={filteredProjects} />
    </div>
  );
}
