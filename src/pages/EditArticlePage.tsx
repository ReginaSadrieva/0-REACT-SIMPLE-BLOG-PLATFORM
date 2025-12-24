// ------------------------------------------------------------------
// Purpose: Article editing page.
//          Reuses ArticleForm from creation.
// ------------------------------------------------------------------

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditArticlePage.module.scss';
import Container from '../components/common/Container';
import ArticleForm from '../components/article/ArticleForm';
import { fetchArticle, updateArticle } from '../api/articles';
import { useAuth } from '../hooks/useAuth';
import type { ArticleFormData } from '../../src/validation/articleSchemas';

export default function EditArticlePage() {
  const { slug } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleFormData | null>(null);

  useEffect(() => {
    if (slug) {
      const loadArticle = async () => {
        const response = await fetchArticle(slug);
        setArticle({
          title: response.title,
          description: response.description,
          body: response.body,
          tagList: response.tagList.join(', '),
        });
      };
      loadArticle();
    }
  }, [slug]);

  const onSubmit = async (data: ArticleFormData) => {
    if (token && slug) {
      await updateArticle(token, slug, data);
      navigate(`/articles/${slug}`);
    }
  };

  return (
    <Container>
      <div className={styles.editPost}>
        <h1 className={styles.editPost__title}>Edit Post</h1>
        {article ? (
          <ArticleForm onSubmit={onSubmit} defaultValues={article} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Container>
  );
}
