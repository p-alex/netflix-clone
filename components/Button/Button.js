import styles from "./Button.module.css";
export default function Button({
  type,
  func,
  value,
  responsive,
  isDisabled,
  ariaLabel,
}) {
  return (
    <>
      <button
        className={responsive ? styles.btnResponsive : styles.btn}
        onClick={func}
        disabled={isDisabled ? true : false}
        name={value}
        aria-label={ariaLabel}
      >
        {type && (
          <i
            className={
              type === "play"
                ? "fas fa-play"
                : type === "moreInfo"
                ? "fas fa-info-circle"
                : type === "addToList"
            }
          ></i>
        )}
        {value && <span>{value}</span>}
      </button>
    </>
  );
}
