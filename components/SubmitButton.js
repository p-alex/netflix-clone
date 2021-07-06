import styles from "../styles/SubmitButton.module.css";
export default function SubmitButton({ children }) {
  return (
    <button className={styles.submitButton} type="submit">
      {children}
    </button>
  );
}
