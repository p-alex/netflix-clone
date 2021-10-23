import styles from "./Button.module.css";
export default function Button({
  type,
  func,
  value,
  size,
  isDisabled,
  ariaLabel,
}) {
  return (
    <>
      <button
        className={
          size === "responsive"
            ? styles.btnResponsive
            : size === "large"
            ? styles.btnLarge
            : styles.btn
        }
        onClick={func}
        disabled={isDisabled ? true : false}
        name={value}
        aria-label={ariaLabel}
      >
        {type && (
          <i
            style={!value ? { marginRight: "0" } : null}
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
