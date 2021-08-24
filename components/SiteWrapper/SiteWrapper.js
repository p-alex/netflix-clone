import styles from "./SiteWrapper.module.css";
export default function SiteWrapper({ children }) {
  return <div className={styles.container}>{children}</div>;
}
