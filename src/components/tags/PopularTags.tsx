import styles from './PopularTags.module.scss';

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
      <h2 className={styles.popularTags__title}>Popular Tags</h2>

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
