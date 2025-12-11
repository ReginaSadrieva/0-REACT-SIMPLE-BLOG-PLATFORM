import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import styles from './ArticleList.module.scss';

export default function ArticleList() {
  return (
    <div className={styles.list}>
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <Pagination />
    </div>
  );
}
