import { CSSProperties } from 'react';
import Map from './components/map';

export default function Home() {
  return (
    <main style={mainStyles}>
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
