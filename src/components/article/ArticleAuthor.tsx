import styles from './ArticleAuthor.module.scss';
import profileIcon from '../../assets/icons/profile.svg';

export default function ArticleAuthor() {
  return (
    <div className={styles.author}>
      <img src={profileIcon} alt="author" className={styles.author__avatar} />
      <div className={styles.author__info}>
        <p className={styles.author__name}>John Lobster</p>
        <p className={styles.author__date}>01 January 2023</p>
      </div>
    </div>
  );
}
