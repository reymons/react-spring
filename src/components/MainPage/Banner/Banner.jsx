import styles from './Banner.module.scss';

const Banner = () => {
  return (
    <div className={styles.container}>
        <div className={`${styles.col} ${styles.col1}`}></div>
        <div className={`${styles.col} ${styles.col2}`}>
          <h1 className={styles.title}>AutoShow</h1>
          <p className={styles.tagline}>Просмотр авто по доступной цене</p>
          <div className={styles.btnWrapper}><button>Заказать</button></div>
        </div>
        <div className={`${styles.col} ${styles.col3}`}></div>
    </div>
  )
}

export default Banner;