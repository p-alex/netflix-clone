import styles from "../styles/Login.module.css";
import Link from "next/link";
export default function register() {
  return (
    <div
      className={styles.login_wrapper}
      style={{ backgroundImage: "url(/images/bg/auth-bg.jpg)" }}
    >
      <div className={styles.black_overlay}></div>
      <form className={styles.form}>
        <div className={styles.logo}>
          <img src="/images/logo/netflix-logo.png" alt="" />
        </div>
        <div className={styles.input_group}>
          <input type="email" name="email" id="email" placeholder=" " />
          <label for="email">E-mail</label>
        </div>
        <div className={styles.input_group}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder=" "
          />
          <label for="password">Password</label>
        </div>
        <button type="submit">Login</button>
        <p>
          Need an account? <Link href="/register">Register now</Link>
        </p>
      </form>
    </div>
  );
}
