import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__social}>
        <li>
          <a
            href="https://github.com/p-alex"
            target="_blank"
            rel="noreferrer noopener"
            title="My Github profile"
          >
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/alexandru-daniel-pistol"
            target="_blank"
            rel="noreferrer noopener"
            title="My LinkedIn profile"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
      </ul>
      <ul className={styles.footer__links}>
        <li>
          <a href="#">Audio and Subtitles</a>
        </li>
        <li>
          <a href="#">Audio Description</a>
        </li>
        <li>
          <a href="#">Help Center</a>
        </li>
        <li>
          <a href="#">Gift Cards</a>
        </li>
        <li>
          <a href="#">Media Center</a>
        </li>
        <li>
          <a href="#">Investor Relations</a>
        </li>
        <li>
          <a href="#">Jobs</a>
        </li>
        <li>
          <a href="#">Terms of Use</a>
        </li>
        <li>
          <a href="#">Privacy</a>
        </li>
        <li>
          <a href="#">Legal Notices</a>
        </li>
        <li>
          <a href="#">Cookie Preferences</a>
        </li>
        <li>
          <a href="#">Corporate Information</a>
        </li>
        <li>
          <a href="#">Contact Us</a>
        </li>
      </ul>
      <div className={styles.footer__bottom}>
        <small>
          Netflix Clone created by{" "}
          <a
            href="https://www.linkedin.com/in/alexandru-daniel-pistol"
            target="_blank"
            rel="noreferrer noopener"
            title="My LinkedIn profile"
          >
            Alex Daniel
          </a>
          .
        </small>
        <small>
          This application was created just to be added to my portfolio so i can
          maybe land job.
        </small>
      </div>
    </footer>
  );
}
