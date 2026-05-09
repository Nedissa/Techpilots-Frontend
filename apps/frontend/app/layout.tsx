import type { Metadata } from 'next';
import './globals.css';
import { FooterWrapper } from './components/FooterWrapper';
import { RootLayoutClient } from './components/RootLayoutClient';
import { HeaderWrapper } from './components/HeaderWrapper';

export const metadata: Metadata = {
  title: 'TechPilots - Datorkomponenter och Datorer',
  description: 'Köp högkvalitativa datorer, komponenter och tillbehör',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" style={{ scrollbarGutter: 'stable' }}>
      <body className="bg-white flex flex-col min-h-screen">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
