// ------------------------------------------------------------------
// Purpose: Renders the list of tags for a single article (shown at the bottom of each ArticleCard).
//
// Why it's a separate component:
//   • Reusability – used in ArticleCard and will be reused on the full article page
//   • Keeps ArticleCard clean and focused only on layout
//   • Easy to change tag styling in one place
//
// How it works:
//   • Receives the whole article object as a prop
//   • Safely maps over article.tagList (array can be empty)
//   • Each tag is rendered as a small pill with border and rounded corners
//   • Exact design from Figma: 1px gray border, #aaaaaa text, 8px corner radius
// ------------------------------------------------------------------

import styles from './ArticleTags.module.scss';
import type { Article } from '../../api/articles';
import { Tag } from '../tags/PopularTags';
/**
 * Props for ArticleTags.
 * We pass the full article because tagList is part of it.
 */
interface Props {
  article: Article;
}

/**
 * ArticleTags – displays all tags associated with the article.
 *
 * Visual details (Figma):
 *   • Tags are in a horizontal flex container with wrap
 *   • Gap between tags: 8px
 *   • Each tag: 12.8px Source Sans Pro, color #aaaaaa, 1px border #aaaaaa, 8px radius
 */
export default function ArticleTags({ article }: Props) {
  return (
    <div className={styles.tags}>
      {/* Safe mapping – tagList can be empty, but never undefined is prevented by ?. */}
      {article.tagList?.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}
