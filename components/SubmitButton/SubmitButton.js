import styles from "./SubmitButton.module.css";
export default function SubmitButton({ children, isDisabled }) {
  return (
    <button
      className={styles.submitButton}
      type="submit"
      aria-label={children}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
