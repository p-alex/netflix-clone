import styles from "../styles/FullscreenWrapper.module.css";
export default function FullscreenWrapper({ children, bgImg }) {
  return (
    <div className={styles.wrapper} style={{ backgroundImage: bgImg }}>
      <div className={styles.black_overlay}></div>
      {children}
    </div>
  );
}
