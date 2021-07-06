import styles from "../styles/InputGroup.module.css";
export default function InputGroup({
  setLabel,
  setType,
  setName,
  setId,
  setPlaceholder,
  handleChangeFunc,
}) {
  return (
    <div className={styles.input_group}>
      <input
        type={setType}
        name={setName}
        id={setId}
        placeholder={setPlaceholder}
        onChange={(e) => handleChangeFunc(e)}
      />
      <label htmlFor={setId}>{setLabel}</label>
    </div>
  );
}
