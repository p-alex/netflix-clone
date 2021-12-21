import styles from "./SubmitButton.module.css";
export default function SubmitButton({
  children,
  isDisabled,
  isTypeSubmit,
  func,
}) {
  return (
    <button
      className={styles.submitButton}
      type={isTypeSubmit ? "submit" : "button"}
      aria-label={children}
      disabled={isDisabled}
      onClick={!isTypeSubmit ? func : null}
    >
      {children}
    </button>
  );
}
