// ------------------------------------------------------------------
// Purpose: Article creation page.
//          Redirect to login if not authenticated.
// ------------------------------------------------------------------

import styles from './NewArticlePage.module.scss';
import Container from '../components/common/Container';
import ArticleForm from '../components/article/ArticleForm';
import { createArticle } from '../api/articles';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { ArticleFormData } from '../validation/articleSchemas';

export default function NewArticlePage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/sign-in'); // redirect if not logged in
  }, [token, navigate]);

  const onSubmit = async (data: ArticleFormData) => {
    if (token) {
      await createArticle(token, data);
      navigate('/profile');
    }
  };

  return (
    <Container>
      <div className={styles.newPost}>
        <h1 className={styles.newPost__title}>New Post</h1>
        <ArticleForm onSubmit={onSubmit} />
      </div>
    </Container>
  );
}
