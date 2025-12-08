import type { ReactNode } from 'react';
import Header from './Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        {children} {/* ← теперь всё, включая баннер, рендерится напрямую */}
      </main>
    </>
  );
}
