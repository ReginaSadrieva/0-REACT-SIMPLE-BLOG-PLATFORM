import styles from './Banner.module.scss';

export default function Banner() {
  return (
    <section className={styles.banner}>
      <h1 className={styles.banner__title}>Realworld Blog</h1>
      <p className={styles.banner__subtitle}>
        A place to share your knowledge.
      </p>
    </section>
  );
}
