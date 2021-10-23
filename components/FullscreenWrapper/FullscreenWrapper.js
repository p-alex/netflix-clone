import styles from "./FullscreenWrapper.module.css";
export default function FullscreenWrapper({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.black_overlay}></div>
      {children}
    </div>
  );
}
