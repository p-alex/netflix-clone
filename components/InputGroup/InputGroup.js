import { useState, useEffect } from "react";
import styles from "./InputGroup.module.css";
export default function InputGroup({
  inputFor,
  setLabel,
  setType,
  setName,
  setId,
  setPlaceholder,
  handleChangeFunc,
  usernameForValidation,
  passwordForValidation,
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

  useEffect(() => {
    //Username validation regex
    const usernameBetweenFiveAndTwelveChars = /^[a-zA-Z0-9]{5,12}$/.test(
      usernameForValidation
    );
    //Password validation regex
    const passwordAtLeastOneUppercaseAndLowercase =
      /^(?=.*?[A-Z])(?=.*?[a-z])/.test(passwordForValidation);
    const passwordAtLeastOneNumber = /(?=.*?[0-9])/.test(passwordForValidation);
    const passwordAtLeastOneSpecial = /(?=.*?[!@#$%^&*-])/.test(
      passwordForValidation
    );
    const passwordAtLeastEightCharacters =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-]).{8,}$/.test(
        passwordForValidation
      );

    if (usernameBetweenFiveAndTwelveChars) {
      setUsernameValidation({ usernameBetweenFiveAndTwelveChars: true });
    } else {
      setUsernameValidation({ usernameBetweenFiveAndTwelveChars: false });
    }

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
  }, [usernameForValidation, passwordForValidation]);

  return (
    <>
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
      {inputFor === "register" || inputFor === "resetPassword" ? (
        <>
          {setLabel === "Username" && (
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
          )}
          {setLabel === "Password" ||
            (setLabel === "New password" && (
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
                      at least 8 characters long
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </>
      ) : null}
    </>
  );
}
