import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import FullscreenWrapper from "../components/FullscreenWrapper";
import Form from "../components/Form";
import InputGroup from "../components/InputGroup";
import SubmitButton from "../components/SubmitButton";

import styles from "../styles/Login.module.css";
export default function register() {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    isRegister: false,
  });

  const [feedback, setFeedback] = useState("");

  const inputList = [
    { label: "E-mail", setNameId: "email", type: "email", placeholder: " " },
    {
      label: "Password",
      setNameId: "password",
      type: "password",
      placeholder: " ",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const resultJSON = await result.json();

      const user = resultJSON.user;

      if (resultJSON.message === "Logged in!") {
        await localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      } else {
        setFeedback(resultJSON.message);
      }
    } catch {
      setFeedback("Something went wrong... Try again later.");
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <FullscreenWrapper bgImg={"url(/images/bg/auth-bg.jpg)"}>
      <main>
        <Form submitFunc={handleSubmit}>
          <div className={styles.logo}>
            <img src="/images/logo/netflix-logo.png" alt="" />
          </div>
          <p>{feedback && feedback}</p>
          {inputList.map((input) => {
            return (
              <InputGroup
                key={input.label}
                setId={input.setNameId}
                setType={input.type}
                setPlaceholder={input.placeholder}
                setName={input.setNameId}
                setLabel={input.label}
                handleChangeFunc={handleChange}
              />
            );
          })}
          <SubmitButton>Login</SubmitButton>
          <p>
            Need an account? <Link href="/register">Register now</Link>
          </p>
        </Form>
      </main>
    </FullscreenWrapper>
  );
}
