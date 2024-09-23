import Image from 'next/image';
import BPLogo from '@/assets/images/bp-logo.png';
import { imageStyles, mainStyles } from './page.css';

export default function Home() {
  return (
    <main className={mainStyles}>
      <Image className={imageStyles} src={BPLogo} alt="Blueprint Logo" />
      <p>Open up app/page.tsx to get started!</p>
    </main>
  );
}
