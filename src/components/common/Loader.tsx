// ------------------------------------------------------------------
// Purpose: Full-screen loading indicator shown while articles are being fetched from the API.
//
// Why it's separate:
//   • Reused in multiple places (ArticleList, future profile page, etc.)
//   • Keeps loading UI consistent across the app
//   • Easy to customize animation or text later
//
// Visual details (Figma):
//   • Icon: loading.svg, 64×64 px
//   • Text: "Loading", Titillium Web, Regular, 32px, green (#5cb85c)
//   • Centered vertically and horizontally
//   • Spinning animation via CSS keyframes
// ------------------------------------------------------------------

import styles from './Loader.module.scss';
import loadingIcon from '../../assets/icons/loading.svg';

export default function Loader() {
  return (
    <div className={styles.loader}>
      {/* Spinning loading icon */}
      <img src={loadingIcon} alt="loading..." className={styles.loader__icon} />

      {/* Loading text */}
      <p className={styles.loader__text}>Loading</p>
    </div>
  );
}
