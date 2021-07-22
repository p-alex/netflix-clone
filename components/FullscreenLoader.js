import styles from "../styles/FullscreenLoader.module.css";
export default function FullscreenLoader() {
  return (
    <div className={styles.fullscreenLoader}>
      <div className={styles.loader}>
        <img src={"/images/logo/netflix-logo.png"} alt="" />
      </div>
    </div>
  );
}
