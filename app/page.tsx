import Image from 'next/image';
import BPLogo from '@/assets/images/bp-logo.png';

export default function Home() {
  return (
    <main className="flex h-svh w-full flex-col items-center justify-center">
      <Image className="mb-2 h-20 w-20" src={BPLogo} alt="Blueprint Logo" />
      <p>Open up app/page.tsx to get started!</p>
    </main>
  );
}
