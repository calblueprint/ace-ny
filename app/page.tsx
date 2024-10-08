import { CSSProperties } from 'react';
import ProjectModal from '@/components/ProjectModal';
import Map from './components/map';

export default function Home() {
  return (
    <main style={mainStyles}>
      <ProjectModal
        project_name="RIPTIDE STORAGE"
        developer="ACE DevCo NC, LLC"
        size="1,200 MW/Mo"
        additional_info="lorem ipsum blah blah"
      ></ProjectModal>
      <Map />
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
