// ------------------------------------------------------------------
// Purpose: Logged-in user profile page.
//          Displays user banner with icon and name, then Popular Tags, user's articles, and pagination (commented until article creation is implemented).
// ------------------------------------------------------------------

import styles from './UserProfilePage.module.scss';
import Container from '../components/common/Container';
import PopularTags from '../components/tags/PopularTags';
//import ArticleList from '../components/article/ArticleList';
//import Pagination from '../components/article/Pagination';
//import { useEffect, useState } from 'react';
//import { fetchArticles, type Article } from '../api/articles';
import profileIcon from '../assets/icons/profile.svg';
import { useAuth } from '../hooks/useAuth';

export default function UserProfilePage() {
  const { user } = useAuth();
  //   const [articles, setArticles] = useState<Article[]>([]);
  //   const [articlesCount, setArticlesCount] = useState(0);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const limit = 10; // articles per page

  // Fetch user's articles
  //   useEffect(() => {
  //     if (user?.username) {
  //       const loadUserArticles = async () => {
  //         const response = await fetchArticles(currentPage, limit, {
  //           author: user.username,
  //         });
  //         setArticles(response.articles);
  //         setArticlesCount(response.articlesCount);
  //       };
  //       loadUserArticles();
  //     }
  //   }, [currentPage, user?.username]);

  return (
    <>
      {/* Black banner with user icon and name */}
      <section className={styles.banner}>
        <div className={styles.banner__content}>
          <img
            src={user?.image || profileIcon} // use user image or default profile.svg if no image
            alt={user?.username}
            className={styles.banner__avatar}
          />
          <h2 className={styles.banner__username}>{user?.username}</h2>
        </div>
      </section>

      {/* Content below banner: Popular Tags, User's Articles, Pagination */}
      <Container>
        <PopularTags />

        {/* Commented until article creation is implemented */}
        {/*
        <ArticleList articles={articles} />
        <Pagination
          total={articlesCount}
          current={currentPage}
          limit={limit}
          onPageChange={setCurrentPage}
        />
        */}
      </Container>
    </>
  );
}
