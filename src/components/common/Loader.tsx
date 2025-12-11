import styles from './Loader.module.scss';
import loadingIcon from '../../assets/icons/loading.svg';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <img src={loadingIcon} alt="loading..." className={styles.loader__icon} />
      <p className={styles.loader__text}>Loading</p>
    </div>
  );
}
