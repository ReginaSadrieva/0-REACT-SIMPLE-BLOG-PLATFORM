// ------------------------------------------------------------------
// Purpose: Renders the "favorite" (like) button with a heart icon and the current number of favorites.
//          Shown in the top-right corner of every article card.
//
// Why it's a separate component:
//   • Reusability – used in ArticleCard and potentially in the full article view
//   • Single responsibility – only handles the favorite button
//   • Easy to extend later (e.g. add real favoriting functionality in phase 2)
//
// How it works:
//   • Receives the full `article` object as a prop
//   • Displays the static green heart icon (heart-green.svg)
//   • Shows the real `favoritesCount` from the API
//   • Button is disabled for now (as required by the task – user is not authenticated)
//   • Hover effect: green background + white heart (filter in SCSS)
//   • Exact sizes and colors are taken from the Figma design
// ------------------------------------------------------------------

import { useState } from 'react';
import styles from './ArticleFavoriteButton.module.scss';
import heartIcon from '../../assets/icons/heart-green.svg';
import type { Article } from '../../api/articles';
import { favoriteArticle, unfavoriteArticle } from '../../api/articles';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  article: Article;
}

export default function ArticleFavoriteButton({ article }: Props) {
  const { token, isAuthenticated } = useAuth();

  const [favorited, setFavorited] = useState(article.favorited);
  const [count, setCount] = useState(article.favoritesCount);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!isAuthenticated || !token || loading) return;

    setLoading(true);

    try {
      const updatedArticle = favorited
        ? await unfavoriteArticle(token, article.slug)
        : await favoriteArticle(token, article.slug);

      setFavorited(updatedArticle.favorited);
      setCount(updatedArticle.favoritesCount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={styles.favorite}
      onClick={handleClick}
      disabled={loading}
    >
      <img src={heartIcon} alt="like" className={styles.favorite__icon} />
      <span className={styles.favorite__count}>{count}</span>
    </button>
  );
}
