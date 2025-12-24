// ------------------------------------------------------------------
// Purpose: Main component for displaying the list of article previews on the home page.
//          Handles fetching articles from the API, pagination, loading state, and errors.
//
// Why it's a separate component:
//   • Encapsulates all logic for loading and rendering the article list
//   • Keeps HomePage simple (just composes Banner + PopularTags + ArticleList)
//   • Easy to test and extend (e.g. add filters, "Your Feed" in future phases)
//
// How it works:
//   • Fetches articles on mount and on page change
//   • Shows Loader during fetch
//   • Shows error if fetch fails
//   • Renders ArticleCard for each article
//   • Renders Pagination with total pages calculated from articlesCount
//   • Server-side pagination (offset/limit) for efficiency – no client-side slicing
// ------------------------------------------------------------------

import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import Loader from '../common/Loader';
import styles from './ArticleList.module.scss';
import { fetchArticles, type Article } from '../../api/articles';

interface ArticleListProps {
  articles?: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  // State for storing fetched articles
  const [fetchedArticles, setFetchedArticles] = useState<Article[]>([]);

  // State for loading indicator
  const [loading, setLoading] = useState(true);

  // State for error flag
  const [error, setError] = useState(false);

  // Current page (starts at 1)
  const [currentPage, setCurrentPage] = useState(1);

  // Total number of pages based on articlesCount
  const [totalPages, setTotalPages] = useState(1);

  /**
   * Async function to load articles for a specific page.
   * Sets loading/error states and updates data.
   */
  const loadPage = async (page: number) => {
    setLoading(true);
    setError(false);
    try {
      const { articles, articlesCount } = await fetchArticles(page);
      setFetchedArticles(articles);
      setTotalPages(Math.ceil(articlesCount / 10)); // Assuming limit=10
      setCurrentPage(page);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Load first page on component mount
  useEffect(() => {
    loadPage(1);
  }, []);

  // Show loader during fetch
  if (loading) return <Loader />;

  // Show error if fetch failed
  if (error)
    return <div className={styles.error}>OOPS...ARTICLES LOADING ERROR</div>;

  const displayArticles = articles || fetchedArticles;

  // Render list and pagination on success
  return (
    <div className={styles.list}>
      {displayArticles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={loadPage}
      />
    </div>
  );
}
