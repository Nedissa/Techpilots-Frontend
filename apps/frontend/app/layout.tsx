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
          <HeaderWrapper />
          <main className="py-4 pb-24 flex justify-center flex-1 min-h-screen">
            <div className="w-full max-w-[1280px]">
              {children}
            </div>
          </main>
          <FooterWrapper />
        </RootLayoutClient>
      </body>
    </html>
  );
}
