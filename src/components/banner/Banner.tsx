import styles from './Banner.module.css';

export default function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.banner__content}>
        <h1 className={styles.banner__title}>
          Realworld Blog
          <span className={styles.banner__underline}></span>
        </h1>
        <p className={styles.banner__subtitle}>
          A place to share your knowledge.
        </p>
      </div>
    </section>
  );
}
