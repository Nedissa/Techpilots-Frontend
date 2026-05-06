'use client';

import { Aside } from './Aside';
import { CartAside } from './CartAside';
import React from 'react';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <Aside.Provider>
      {children}
      <CartAside />
    </Aside.Provider>
  );
}
