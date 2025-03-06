import React from 'react';
import { Project } from '@/types/schema';

export default function DownloadData({
  filteredProjects,
}: {
  filteredProjects: Project[];
}) {
  const downloadFilteredProjects = async () => {
    let csvContent = '';
    const headers = Object.keys(filteredProjects[0]) as (keyof Project)[];
    console.log(headers);
    csvContent += headers.join(',') + '\n'; // add headers to csv
    for (const project of filteredProjects) { // add each project to csv
      let row = '';
      for (const header of headers) {
        if (header === 'key_development_milestones') { // destructuring array of objects to string
          const milestonesToAdd = project[header]?.map((milestone) => {
            console.log(milestone);
            return JSON.stringify(milestone).replace(/"/g, '""'); 
          });
          row += `"${milestonesToAdd.join(',')}",`;
        } else if (header === 'last_updated') { // destructuring object to string
          const lastUpdatedStr = JSON.stringify(project[header]).replace(/"/g, '""'); 
          row += `"${lastUpdatedStr}",`;
        } else {
          row += `${project[header]},`; 
        }
      }
      csvContent += row.slice(0, -1) + '\n'; 
    }

    // creates downloadable blob that downloads the csv file
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
