// ------------------------------------------------------------------
// Purpose: Full article detail page displayed at /articles/{slug}.
//
// Requirements (Phase 1):
//   • Fetch single article by slug from API
//   • Render full body as Markdown (using react-markdown + remark-gfm)
//   • Full-width dark banner with title
//   • Author info (with white circle around green avatar)
//   • Favorite button (non-functional for now)
//   • Tags at the bottom
//   • Responsive layout matching Figma design
// ------------------------------------------------------------------

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './ArticlePage.module.scss';
import ArticleAuthor from '../components/article/ArticleAuthor';
import ArticleTags from '../components/article/ArticleTags';
import Container from '../components/common/Container';
import Loader from '../components/common/Loader';
import { fetchArticles, deleteArticle, type Article } from '../api/articles';
import Button from '../components/button/Button';
import { useAuth } from '../hooks/useAuth';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      try {
        const { articles } = await fetchArticles(1, 100); // load enough to find the slug
        const found = articles.find((a) => a.slug === slug);
        setArticle(found || null);
      } catch {
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) loadArticle();
  }, [slug]);

  const isAuthor = user && article?.author.username === user.username;

  const handleDelete = async () => {
    if (!token || !slug) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete this article?'
    );

    if (!confirmed) return;

    await deleteArticle(token, slug);
    navigate('/');
  };

  if (loading) return <Loader />;
  if (!article) return <div className={styles.error}>Article not found</div>;

  return (
    <>
      {/* Dark full-width banner with article title */}
      <section className={styles.banner}>
        <Container>
          <h1 className={styles.banner__title}>{article.title}</h1>
          <ArticleAuthor article={article} />
        </Container>
      </section>

      {/* Article body – rendered as Markdown */}
      <Container>
        <div className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.body}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        <ArticleTags article={article} />

        {/* Bottom author + favorite button */}
        <div className={styles.bottomAuthorSection}>
          <ArticleAuthor article={article} />

          <div className={styles.articleButtons}>
            {/* <Button text="Favorite article" disabled={true} /> */}

            {isAuthor && (
              <div className={styles.articleActions}>
                <Button
                  text="Edit Article"
                  onClick={() => navigate(`/articles/${article.slug}/edit`)}
                />
                <Button text="Delete Article" onClick={handleDelete} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
