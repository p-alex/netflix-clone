import Link from "next/link";
import styles from "./Logo.module.css";
export default function Logo({ type, margin, maxWidth }) {
  return (
    <>
      {type === "big" && (
        <div className={styles.logo}>
          <Link href="/" style={{ margin }}>
            <img
              style={{ maxWidth }}
              src="/images/logo/netplix-logo.png"
              alt=""
            />
          </Link>
        </div>
      )}
    </>
  );
}
