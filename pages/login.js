import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import FullscreenWrapper from "../components/FullscreenWrapper/FullscreenWrapper";
import Form from "../components/Form/Form";
import InputGroup from "../components/InputGroup/InputGroup";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import Logo from "../components/Logo/Logo";
import Head from "next/head";
import styles from "../styles/Login.module.css";
export default function login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    authType: "login",
  });
  const handleResetInputs = () =>
    setInputs((prevState) => ({ ...prevState, email: "", password: "" }));
  const [feedback, setFeedback] = useState("");

  const inputList = [
    {
      label: "E-mail",
      setNameId: "email",
      type: "email",
      placeholder: " ",
      value: inputs.email,
    },
    {
      label: "Password",
      setNameId: "password",
      type: "password",
      placeholder: " ",
      value: inputs.password,
    },
  ];

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://netflix-clone-inky-five.vercel.app";
    try {
      const result = await fetch(`${url}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs }),
      });

      const resultJSON = await result.json();

      if (resultJSON.ok) {
        handleResetInputs();
        setIsLoading(false);
        router.push("/");
      } else {
        setIsLoading(false);
      }
      setFeedback(resultJSON.message);
    } catch {
      handleResetInputs();
      setIsLoading(false);
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
    <FullscreenWrapper bgImg={"url(/images/bg/auth-bg.webp)"}>
      <Head>
        <title>Netflix Clone | Login</title>
      </Head>
      <main className={styles.login}>
        <Form submitFunc={handleSubmit}>
          <Logo type="big" margin="0 auto 50px auto" maxWidth="160px" />

          <p>{feedback && feedback}</p>
          {inputList.map((input, id) => {
            return (
              <InputGroup
                key={input.label}
                setId={input.setNameId}
                setType={input.type}
                setPlaceholder={input.placeholder}
                setName={input.setNameId}
                setLabel={input.label}
                handleChangeFunc={handleChange}
                autoFocus={id === 0 && true}
                inputValue={input.value}
              />
            );
          })}
          <SubmitButton isDisabled={isLoading}>Login</SubmitButton>
          <p>
            Need an account? <Link href="/register">Register now</Link>
          </p>
          <p>
            Forget your password?{" "}
            <Link href="/user/reset-password-email-check">Reset password</Link>
          </p>
        </Form>
      </main>
    </FullscreenWrapper>
  );
}

export async function getServerSideProps(context) {
  let url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://netflix-clone-inky-five.vercel.app";
  const token = await context.req.cookies.token;
  if (token) {
    const result = await fetch(`${url}/api/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resultJSON = await result.json();
    if (resultJSON.message === "Authorized") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
        props: {},
      };
    }
  }
  return { props: {} };
}
