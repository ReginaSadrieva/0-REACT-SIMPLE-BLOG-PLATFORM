import styles from './Pagination.module.scss';

const totalPages = 7;
const currentPage = 1; // later will be from state

export default function Pagination() {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
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
