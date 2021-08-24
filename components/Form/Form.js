import styles from "./Form.module.css";
export default function Form({ children, submitFunc }) {
  return (
    <form className={styles.form} onSubmit={submitFunc}>
      {children}
    </form>
  );
}
