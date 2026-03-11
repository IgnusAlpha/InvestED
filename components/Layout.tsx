import { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-hero">
      <div className="hero-orb left-[-5rem] top-[6rem] h-48 w-48 bg-cyan-400/30" />
      <div className="hero-orb right-[-3rem] top-20 h-56 w-56 bg-fuchsia-500/25" />
      <div className="hero-orb bottom-10 left-1/3 h-44 w-44 bg-emerald-400/20" />
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
