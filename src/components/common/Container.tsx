// ------------------------------------------------------------------
// Purpose: Universal responsive container used on all pages for consistent content width and side padding.
//
// Why we created it:
//   • Eliminates code duplication (no need to write max-width + padding in every component)
//   • Guarantees identical layout across the entire app
//   • Fully responsive – automatically reduces padding on smaller screens
//   • Matches Figma design: 240px side padding on desktop
//
// How it works:
//   • max-width: 1280px
//   • horizontal padding adapts via media queries
//   • Used in Layout → wraps all page content except Header and Banner
// ------------------------------------------------------------------

import styles from './Container.module.scss';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Container – central layout wrapper with responsive side margins.
 * Applied to all pages after the full-width Banner.
 */
export default function Container({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
