import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import Link from "next/link";
export default function register() {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    isRegister: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const result = await fetch("http://localhost:3000/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        });

        const resultJSON = await result.json();
        //if (resultJSON) localStorage.setItem("user", JSON.stringify(user));

        const user = resultJSON.user;

        if (resultJSON.message === "Logged in!") {
          await localStorage.setItem("user", JSON.stringify(user));
          router.push("/");
        }
      } catch {
        console.log(resultJSON);
      }
    }
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div
      className={styles.login_wrapper}
      style={{ backgroundImage: "url(/images/bg/auth-bg.jpg)" }}
    >
      <div className={styles.black_overlay}></div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <img src="/images/logo/netflix-logo.png" alt="" />
        </div>
        <div className={styles.input_group}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="email">E-mail</label>
        </div>
        <div className={styles.input_group}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit">Login</button>
        <p>
          Need an account? <Link href="/register">Register now</Link>
        </p>
      </form>
    </div>
  );
}
