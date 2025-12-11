// ------------------------------------------------------------------
// Purpose: Sidebar widget showing the most popular tags in the blog.
//
// Why it's separate:
//   • Displayed only on the home page (global feed)
//   • Independent from article list → can be reused or hidden later
//   • Clean separation of concerns
//
// Current state:
//   • Tags are hard-coded (as per Phase 1 requirements)
//   • In future phases will be replaced with real data from API
//
// Visual details (Figma):
//   • White card with 1px #aaaaaa border, 8px corner radius
//   • Title: Titillium Web, Bold, 16px, black
//   • Tags: Source Sans Pro, SemiBold, 12.8px, #aaaaaa
//   • Tag pills: 1px #aaaaaa border, 8px radius, 8px gap
// ------------------------------------------------------------------

import styles from './PopularTags.module.scss';

/**
 * Temporary static list of popular tags.
 * Will be replaced with API data in future phases.
 */
const tags = [
  'programming',
  'javascript',
  'ember',
  'angular',
  'react',
  'vue',
  'node',
  'webdev',
  'css',
  'html',
];

export default function PopularTags() {
  return (
    <aside className={styles.popularTags}>
      {/* Section title */}
      <h2 className={styles.popularTags__title}>Popular tags</h2>

      {/* List of tag pills */}
      <div className={styles.popularTags__list}>
        {tags.map((tag) => (
          <span key={tag} className={styles.popularTags__tag}>
            {tag}
          </span>
        ))}
      </div>
    </aside>
  );
}
