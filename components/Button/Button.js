import styles from "./Button.module.css";
export default function Button({ type, func, value }) {
  return (
    <>
      <button
        className={
          styles.banner__content__btn_container__btn +
          " " +
          styles.banner__content__btn_container__play
        }
        onClick={func}
      >
        <i
          className={
            type === "play"
              ? "fas fa-play"
              : type === "moreInfo"
              ? "fas fa-info-circle"
              : null
          }
        ></i>
        <span>{value}</span>
      </button>
    </>
  );
}
