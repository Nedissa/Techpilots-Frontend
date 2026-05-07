'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

export function Aside({
  children,
  heading,
  type,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
}) {
  const { type: activeType, close } = useAside();
  const expanded = type === activeType;
  const [isVisible, setIsVisible] = useState(expanded);

  useEffect(() => {
    if (expanded) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
  }, [expanded]);

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        { signal: abortController.signal }
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      className={`fixed inset-0 overflow-hidden z-40 transition-opacity ${
        expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <button
        className="absolute inset-0 bg-black/30"
        onClick={close}
        aria-label="Close"
      />

      {/* Aside Panel */}
      <aside className={`fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-lg transition-transform duration-200 z-50 ${
        expanded ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col`}>
        {/* Header */}
        <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">{heading}</h2>
          <button
            onClick={close}
            className="text-2xl text-gray-600 hover:text-black transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {children}
          <style>{`
            main::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </main>
      </aside>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
