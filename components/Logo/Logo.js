import styles from "./Logo.module.css";
export default function Logo({ type, margin, maxWidth }) {
  return (
    <>
      {type === "big" && (
        <div className={styles.logo} style={{ margin }}>
          <img
            style={{ maxWidth }}
            src="/images/logo/netflix-logo.png"
            alt=""
          />
        </div>
      )}
    </>
  );
}
