import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

// font definitions
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

// site metadata - what shows up on embeds
export const metadata: Metadata = {
  title: 'ACE NY',
  description: 'Alliance for Clean Energy New York',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sans.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
