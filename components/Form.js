import styles from "../styles/Form.module.css";
export default function Form({ children, submitFunc }) {
  return (
    <form className={styles.form} onSubmit={submitFunc}>
      {children}
    </form>
  );
}
