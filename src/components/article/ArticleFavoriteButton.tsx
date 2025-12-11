import styles from './ArticleFavoriteButton.module.scss';
import heartIcon from '../../assets/icons/heart-green.svg';

export default function ArticleFavoriteButton() {
  return (
    <button className={styles.favorite}>
      <img src={heartIcon} alt="like" className={styles.favorite__icon} />
      <span className={styles.favorite__count}>12</span>
    </button>
  );
}
