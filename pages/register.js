import { useState } from "react";

import Link from "next/link";

import FullscreenWrapper from "../components/FullscreenWrapper/FullscreenWrapper";
import Form from "../components/Form/Form";
import InputGroup from "../components/InputGroup/InputGroup";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import Logo from "../components/Logo/Logo";
import Head from "next/head";
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
        body: JSON.stringify({
          ...inputs,
          date: Date.now(),
          authType: "register",
          movieList: [],
        }),
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
  };

  return (
    <FullscreenWrapper bgImg={"url(/images/bg/auth-bg.jpg)"}>
      <Head>
        <title>Netflix Clone | Register</title>
      </Head>
      <main>
        <Form submitFunc={handleSubmit}>
          <Logo type="big" margin="0 auto 50px auto" maxWidth="160px" />
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

export async function getServerSideProps(context) {
  const token = await context.req.cookies.token;
  let url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://netflix-clone-inky-five.vercel.app";
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
