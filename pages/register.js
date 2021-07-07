import { useState } from "react";

import Link from "next/link";

import FullscreenWrapper from "../components/FullscreenWrapper";
import Form from "../components/Form";
import InputGroup from "../components/InputGroup";
import SubmitButton from "../components/SubmitButton";

import styles from "../styles/Register.module.css";
export default function register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isRegister: true,
  });

  const inputList = [
    {
      label: "Username",
      setNameId: "username",
      type: "text",
      placeholder: " ",
    },
    { label: "E-mail", setNameId: "email", type: "email", placeholder: " " },
    {
      label: "Password",
      setNameId: "password",
      type: "password",
      placeholder: " ",
    },
    {
      label: "Confirm Password",
      setNameId: "confirmPassword",
      type: "password",
      placeholder: " ",
    },
  ];

  const [feedback, setFeedback] = useState("");

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
          body: JSON.stringify({ ...inputs, date: Date.now() }),
        });

        const resultJSON = await result.json();

        resultJSON.message === "Registered successfuly!"
          ? setFeedback(
              "We sent you an email to verify your account! Check your email"
            )
          : setFeedback(resultJSON.message);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <FullscreenWrapper bgImg={"url(/images/bg/auth-bg.jpg)"}>
      <main>
        <Form submitFunc={handleSubmit}>
          <div className={styles.logo}>
            <img src="/images/logo/netflix-logo.png" alt="" />
          </div>
          {feedback && <p>{feedback}</p>}
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
          <SubmitButton>Register</SubmitButton>
          <p>
            Already have an account? <Link href="/login">Login now</Link>
          </p>
        </Form>
      </main>
    </FullscreenWrapper>
  );
}
