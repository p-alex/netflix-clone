import styles from "../styles/BigLogo.module.css";
export default function BigLogo({ type, margin }) {
  return (
    <>
      {type === "big" && (
        <div className={styles.logo} style={{ margin }}>
          <img src="/images/logo/netflix-logo.png" alt="" />
        </div>
      )}
    </>
  );
}
