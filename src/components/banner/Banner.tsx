// ------------------------------------------------------------------
// Purpose: Full-width hero banner displayed only on the home page.
//          Contains the main title and subtitle of the blog.
//
// Why it's a separate component:
//   • Used only on the home page → clear separation from other pages
//   • Easy to modify design (colors, text, animation) in one place
//   • Keeps HomePage clean and readable
//
// Visual details (Figma):
//   • Background: #61bb61 (slightly different green from header)
//   • Height: 190px
//   • Title: Titillium Web, 700, 56px, white with white underline
//   • Subtitle: Source Sans Pro, 400, 24px, white, 90% opacity
//   • Full width (outside Container)
// ------------------------------------------------------------------

import styles from './Banner.module.scss';

export default function Banner() {
  return (
    <section className={styles.banner}>
      <h1 className={styles.banner__title}>Realworld Blog</h1>
      <p className={styles.banner__subtitle}>
        A place to share your knowledge.
      </p>
    </section>
  );
}
