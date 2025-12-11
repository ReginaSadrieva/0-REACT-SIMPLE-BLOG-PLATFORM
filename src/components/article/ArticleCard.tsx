import styles from './ArticleCard.module.scss';
import ArticleAuthor from './ArticleAuthor';
import ArticleFavoriteButton from './ArticleFavoriteButton';
import ArticleTags from './ArticleTags';

export default function ArticleCard() {
  return (
    <article className={styles.card}>
      <div className={styles.card__header}>
        <ArticleAuthor />
        <ArticleFavoriteButton />
      </div>

      <div className={styles.card__content}>
        <h2 className={styles.card__title}>
          If we quantify the alarm, we can get to the FTP pixel through the
          online SSL interface!
        </h2>
        <p className={styles.card__text}>
          Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam aut
          cupiditate est facere omnis possimus...
        </p>
      </div>

      <ArticleTags />
    </article>
  );
}
