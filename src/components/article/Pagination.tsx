// ------------------------------------------------------------------
// Purpose: Server-side pagination controls displayed below the article list.
//
// Why it's a separate component:
//   • Reusability – can be used on any paginated list (global feed, tag feed, profile, etc.)
//   • Clean separation – ArticleList only handles data, Pagination only handles UI/controls
//   • Easy to modify appearance or add "Previous/Next" buttons later
//
// How it works:
//   • Receives current page, total pages, and callback to change page
//   • Generates buttons 1 to totalPages
//   • Active page has green background + white text
//   • Inactive pages have green border + green text
//   • Clicking a button triggers onPageChange → ArticleList loads new page from API
// ------------------------------------------------------------------

import styles from './Pagination.module.scss';

/**
 * Props for the Pagination component.
 */
interface Props {
  currentPage: number; // currently displayed page
  totalPages: number; // total number of pages calculated from articlesCount
  onPageChange: (page: number) => void; // callback to load a new page
}

/**
 * Pagination – renders clickable page numbers for server-side navigation.
 *
 * Visual details (Figma):
 *   • Buttons: 41×44 px
 *   • No gap between buttons (gap: 0)
 *   • Corner radius: 0 (sharp corners)
 *   • Active button: green background (#5cb85c), white text
 *   • Inactive button: white background, green border and text
 *   • Font: Source Sans Pro, 12.8 px
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className={styles.pagination}>
      {/* Generate array [1, 2, ..., totalPages] and map to buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${styles.pagination__item} ${
            page === currentPage ? styles['pagination__item--active'] : ''
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
