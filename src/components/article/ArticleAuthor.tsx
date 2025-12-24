// ------------------------------------------------------------------
// Purpose: Displays the author information (avatar, username, and date)
//         in the top-left corner of every article card.
//
// Why this is a separate component:
//   • Reusability – used in ArticleCard and potentially in comments later
//   • Separation of concerns – keeps ArticleCard clean and focused
//   • Easier testing and styling – all author-related markup/styles in one place
//
// How it works:
//   • Receives the full `article` object as a prop
//   • Shows the author's avatar (profile.svg placed on green circle background)
//   • Shows the real username and correctly formatted publication date
// ------------------------------------------------------------------

import styles from './ArticleAuthor.module.scss';
import profileIcon from '../../assets/icons/profile.svg';
import type { Article } from '../../api/articles';

/**
 * Props for the ArticleAuthor component.
 * We pass the whole article object because we need author data and creation date.
 */
interface Props {
  article: Article;
}

/**
 * ArticleAuthor – renders the author block that appears in every article preview.
 *
 * Visual details (as per Figma):
 *   • Avatar: 46×46 px, green circle background, profile.svg centered
 *   • Username: Source Sans Pro, SemiBold, 16 px, green (#5cb85c)
 *   • Date: Source Sans Pro, Regular, 12.8 px, gray (#aaaaaa)
 *   • Date format: "01 January 2023"
 */
export default function ArticleAuthor({ article }: Props) {
  return (
    <div className={styles.author}>
      {/* Author avatar – static SVG placed on green background (styled in SCSS) */}

      <img
        src={article.author.image || profileIcon}
        alt={`${article.author.username}'s avatar`}
        className={styles.author__avatar}
      />

      {/* Name + date container */}
      <div className={styles.author__info}>
        {/* Real username from API */}
        <p className={styles.author__name}>{article.author.username}</p>

        {/* Formatted publication date */}
        <p className={styles.author__date}>
          {new Date(article.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}
