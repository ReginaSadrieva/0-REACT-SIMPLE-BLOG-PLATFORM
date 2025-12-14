// ------------------------------------------------------------------
// Purpose: Main article preview card displayed on the home page / article list.
//          This is the central visual block that represents one article.
//
// Why it's a separate component:
//   • Reusability – used in ArticleList, potentially in "Your Feed", "Tag" pages, etc.
//   • Clean separation – keeps HomePage/ArticleList simple and readable
//   • Easy to style and adjust layout in one place
//
// How it works:
//   • Receives the full Article object from the API
//   • Composes three smaller components:
//        – ArticleAuthor (avatar + name + date)
//        – ArticleFavoriteButton (heart + count)
//        – ArticleTags (list of tags)
//   • Renders title and description with correct typography and line clamping
//   • Fully responsive and matches the Figma design pixel-perfect
// ------------------------------------------------------------------

import styles from './ArticleCard.module.scss';
import ArticleAuthor from './ArticleAuthor';
import ArticleFavoriteButton from './ArticleFavoriteButton';
import ArticleTags from './ArticleTags';
import type { Article } from '../../api/articles';
import { Link } from 'react-router-dom';

/**
 * Props for ArticleCard.
 * We pass the whole article because many child components need different parts of it.
 */
interface Props {
  article: Article;
}

/**
 * ArticleCard – the visual representation of a single article in the list.
 *
 * Layout (as per Figma):
 *   • Header row: author (left) + favorite button (right)
 *   • Content: title (32 px, semi-bold) + short description (16 px, gray)
 *   • Bottom: horizontal list of tags
 *
 * All measurements, colors, and fonts are taken directly from the design.
 */

export default function ArticleCard({ article }: Props) {
  return (
    <article className={styles.card}>
      {/* Header row – author and favorite button */}
      <div className={styles.card__header}>
        <ArticleAuthor article={article} />
        <ArticleFavoriteButton article={article} />
      </div>

      {/* Main content – clickable title and description */}
      <div className={styles.card__content}>
        <Link
          to={`/articles/${article.slug}`}
          className={styles.card__titleLink}
        >
          <h2 className={styles.card__title}>{article.title}</h2>
        </Link>
        <p className={styles.card__text}>{article.description}</p>
      </div>

      {/* Tags at the bottom */}
      <ArticleTags article={article} />
    </article>
  );
}
