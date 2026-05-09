'use client';

import { Aside } from './Aside';
import { CartAside } from './CartAside';
import React from 'react';
import { usePathname } from 'next/navigation';
import { HeaderWrapper } from './HeaderWrapper';
import { FooterWrapper } from './FooterWrapper';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === '/konto';

  return (
    <Aside.Provider>
      {!hideHeaderFooter && <HeaderWrapper />}
      <main className="py-4 pb-24 flex justify-center flex-1 min-h-screen">
        <div className="w-full max-w-[1280px]">
          {children}
        </div>
      </main>
      {!hideHeaderFooter && <FooterWrapper />}
      <CartAside />
    </Aside.Provider>
  );
}
