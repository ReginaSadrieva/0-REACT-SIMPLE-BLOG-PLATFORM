import styles from './ArticleTags.module.scss';

const tags = ['programming', 'javascript', 'react', 'webdev'];

export default function ArticleTags() {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <span key={tag} className={styles.tags__item}>
          {tag}
        </span>
      ))}
    </div>
  );
}
