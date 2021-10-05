import { useState, useEffect } from "react";
import styles from "./InputGroup.module.css";
export default function InputGroup({
  inputFor,
  autoFocus,
  setLabel,
  setType,
  setName,
  setId,
  setPlaceholder,
  handleChangeFunc,
  usernameForValidation,
  passwordForValidation,
  inputValue,
}) {
  const [usernameValidation, setUsernameValidation] = useState({
    usernameBetweenFiveAndTwelveChars: false,
  });

  const [passwordValidation, setPasswordValidation] = useState({
    passwordAtLeastOneUppercaseAndLowercase: false,
    passwordAtLeastOneNumber: false,
    passwordAtLeastOneSpecial: false,
    passwordAtLeastEightCharacters: false,
  });

  const [isUsernameFieldFocused, setIsUsernameFieldFocused] = useState(false);
  const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);

  const handleUsernameFieldToggleFeedback = () =>
    setIsUsernameFieldFocused(!isUsernameFieldFocused);
  const handlePasswordFieldToggleFeedback = () =>
    setIsPasswordFieldFocused(!isPasswordFieldFocused);

  useEffect(() => {
    if (inputFor === "register") {
      if (setName === "username") {
        //Username validation regex
        const usernameBetweenFiveAndTwelveChars = /^[a-zA-Z0-9]{5,12}$/.test(
          usernameForValidation
        );
        if (usernameBetweenFiveAndTwelveChars) {
          setUsernameValidation({ usernameBetweenFiveAndTwelveChars: true });
        } else {
          setUsernameValidation({ usernameBetweenFiveAndTwelveChars: false });
        }
      }
    }
  }, [usernameForValidation]);
  useEffect(() => {
    if (inputFor === "register" || inputFor === "resetPassword") {
      if (setName === "password") {
        //Password validation regex
        const passwordAtLeastOneUppercaseAndLowercase =
          /^(?=.*?[A-Z])(?=.*?[a-z])/.test(passwordForValidation);
        const passwordAtLeastOneNumber = /(?=.*?[0-9])/.test(
          passwordForValidation
        );
        const passwordAtLeastOneSpecial = /(?=.*?[!@#$%^&*-])/.test(
          passwordForValidation
        );
        const passwordAtLeastEightCharacters =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-]).{8,}$/.test(
            passwordForValidation
          );

        if (passwordAtLeastOneUppercaseAndLowercase) {
          setPasswordValidation((prevState) => ({
            ...prevState,
            passwordAtLeastOneUppercaseAndLowercase: true,
          }));
        } else {
          setPasswordValidation((prevState) => ({
            ...prevState,
            passwordAtLeastOneUppercaseAndLowercase: false,
          }));
        }

        if (passwordAtLeastOneNumber) {
          setPasswordValidation((prevState) => ({
            ...prevState,
            passwordAtLeastOneNumber: true,
          }));
        } else {
          setPasswordValidation((prevState) => ({
            ...prevState,
            passwordAtLeastOneNumber: false,
          }));
        }

        if (passwordAtLeastOneSpecial) {
          setPasswordValidation((prevState) => ({
            ...prevState,
            passwordAtLeastOneSpecial: true,
          }));
        } else {
          setPasswordValidation((prevState) => ({
            ...prevState,
            passwordAtLeastOneSpecial: false,
          }));
        }

        if (passwordAtLeastEightCharacters) {
          setPasswordValidation((prevState) => ({
            ...prevState,
            passwordAtLeastEightCharacters: true,
          }));
        } else {
          setPasswordValidation((prevState) => ({
            ...prevState,
            passwordAtLeastEightCharacters: false,
          }));
        }
      }
    }
  }, [passwordForValidation]);

  return (
    <>
      <div className={styles.input_group}>
        <input
          type={setType}
          name={setName}
          id={setId}
          placeholder={setPlaceholder}
          onChange={(e) => handleChangeFunc(e)}
          id={
            inputFor === "register" || inputFor === "resetPassword"
              ? setName === "password"
                ? "passwordFieldWithFeedback"
                : setName === "username"
                ? "usernameFieldWithFeedback"
                : null
              : null
          }
          value={inputValue}
          onFocus={
            inputFor === "register" || inputFor === "resetPassword"
              ? setName === "password"
                ? handlePasswordFieldToggleFeedback
                : setName === "username"
                ? handleUsernameFieldToggleFeedback
                : null
              : null
          }
          onBlur={
            inputFor === "register" || inputFor === "resetPassword"
              ? setName === "password"
                ? handlePasswordFieldToggleFeedback
                : setName === "username"
                ? handleUsernameFieldToggleFeedback
                : null
              : null
          }
          autoComplete={setName === "email" ? "on" : "off"}
          autoFocus={autoFocus}
        />
        <label htmlFor={setId}>{setLabel}</label>
      </div>
      {inputFor === "register" || inputFor === "resetPassword" ? (
        <>
          {setName === "username" && isUsernameFieldFocused ? (
            <div className={styles.input__validation}>
              <div className={styles.input__validation__field}>
                <p className={styles.input__validation__field__title}>
                  Username must have:{" "}
                </p>
                <ul className={styles.input__validation__field__list}>
                  <li
                    className={
                      usernameValidation.usernameBetweenFiveAndTwelveChars
                        ? styles.input__validation__field__list__item +
                          " " +
                          styles.input__validation__field__list__item_valid
                        : styles.input__validation__field__list__item
                    }
                  >
                    between 5 and 12 characters
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
          {setName === "password"
            ? isPasswordFieldFocused && (
                <div className={styles.input__validation}>
                  <div className={styles.input__validation__field}>
                    <p className={styles.input__validation__field__title}>
                      Password must have:{" "}
                    </p>
                    <ul className={styles.input__validation__field__list}>
                      <li
                        className={
                          passwordValidation.passwordAtLeastOneUppercaseAndLowercase
                            ? styles.input__validation__field__list__item +
                              " " +
                              styles.input__validation__field__list__item_valid
                            : styles.input__validation__field__list__item
                        }
                      >
                        at least one uppercase and lowercase letter
                      </li>
                      <li
                        className={
                          passwordValidation.passwordAtLeastOneNumber
                            ? styles.input__validation__field__list__item +
                              " " +
                              styles.input__validation__field__list__item_valid
                            : styles.input__validation__field__list__item
                        }
                      >
                        at least one number
                      </li>
                      <li
                        className={
                          passwordValidation.passwordAtLeastOneSpecial
                            ? styles.input__validation__field__list__item +
                              " " +
                              styles.input__validation__field__list__item_valid
                            : styles.input__validation__field__list__item
                        }
                      >
                        at least one special character {`(!,@,#,$,%,^,&,*,-)`}
                      </li>
                      <li
                        className={
                          passwordValidation.passwordAtLeastEightCharacters
                            ? styles.input__validation__field__list__item +
                              " " +
                              styles.input__validation__field__list__item_valid
                            : styles.input__validation__field__list__item
                        }
                      >
                        at least 8 characters
                      </li>
                    </ul>
                  </div>
                </div>
              )
            : null}
        </>
      ) : null}
    </>
  );
}
