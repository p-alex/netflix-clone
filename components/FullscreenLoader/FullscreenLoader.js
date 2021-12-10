import styles from "./FullscreenLoader.module.css";
export default function FullscreenLoader() {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__logo}>
        <img src={"/images/logo/netplix-logo.png"} alt="" />
      </div>
    </div>
  );
}
