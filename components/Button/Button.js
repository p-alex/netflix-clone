import styles from "./Button.module.css";
export default function Button({ type, func, value, responsive }) {
  return (
    <>
      <button
        className={responsive ? styles.btnResponsive : styles.btn}
        onClick={func}
      >
        <i
          className={
            type === "play"
              ? "fas fa-play"
              : type === "moreInfo"
              ? "fas fa-info-circle"
              : type === "addToList"
          }
        ></i>
        {value && <span>{value}</span>}
      </button>
    </>
  );
}
