import React from 'react';
import { Project } from '@/types/schema';

export default function DownloadData({
  filteredProjects,
}: {
  filteredProjects: Project[];
}) {
  // some logic here

  const downloadFilteredProjects = async () => {
    let csvContent = '';
    const headers = Object.keys(filteredProjects[0]) as (keyof Project)[];
    csvContent += headers.join(',') + '\n';
    for (const project of filteredProjects) {
      const row = headers.map(header => project[header]);
      csvContent += row.join(',') + '\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'projects.csv');
    link.click();
    URL.revokeObjectURL(url);
  };
  return <button onClick={downloadFilteredProjects}>Download Projects</button>;
}
