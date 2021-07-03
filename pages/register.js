import styles from "../styles/Register.module.css";
import Link from "next/link";
export default function register() {
  return (
    <div
      className={styles.register_wrapper}
      style={{ backgroundImage: "url(/images/bg/auth-bg.jpg)" }}
    >
      <div className={styles.black_overlay}></div>
      <form className={styles.form}>
        <div className={styles.logo}>
          <img src="/images/logo/netflix-logo.png" alt="" />
        </div>
        <div className={styles.input_group}>
          <input type="text" name="username" id="username" placeholder=" " />
          <label for="username">Username</label>
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
        <div className={styles.input_group}>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder=" "
          />
          <label for="confirmPassword">Confirm password</label>
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link href="/login">Login now</Link>
        </p>
      </form>
    </div>
  );
}
