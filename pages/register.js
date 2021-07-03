import { useState } from "react";
import styles from "../styles/Register.module.css";
import Link from "next/link";
export default function register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isRegister: true,
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inputs.username &&
      inputs.email &&
      inputs.password &&
      inputs.confirmPassword
    ) {
      try {
        const result = await fetch("http://localhost:3000/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });

        const resultJSON = await result.json();

        console.log(resultJSON);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div
      className={styles.register_wrapper}
      style={{ backgroundImage: "url(/images/bg/auth-bg.jpg)" }}
    >
      <div className={styles.black_overlay}></div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <img src="/images/logo/netflix-logo.png" alt="" />
        </div>
        <div className={styles.input_group}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder=" "
            onChange={(e) => handleChange(e)}
            required
          />
          <label for="username">Username</label>
        </div>
        <div className={styles.input_group}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder=" "
            onChange={(e) => handleChange(e)}
            required
          />
          <label for="email">E-mail</label>
        </div>
        <div className={styles.input_group}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder=" "
            onChange={(e) => handleChange(e)}
            required
          />
          <label for="password">Password</label>
        </div>
        <div className={styles.input_group}>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder=" "
            onChange={(e) => handleChange(e)}
            required
          />
          <label for="confirmPassword">Confirm password</label>
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link href="/login">Login now</Link>
        </p>
      </form>
    </div>
  );
}
