import styles from "../styles/Logo.module.css";
export default function Logo({ type, margin }) {
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
