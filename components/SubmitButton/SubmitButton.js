import styles from "./SubmitButton.module.css";
export default function SubmitButton({ children }) {
  return (
    <button className={styles.submitButton} type="submit" aria-label={children}>
      {children}
    </button>
  );
}
