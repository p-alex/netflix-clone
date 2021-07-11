import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import FullscreenWrapper from "../components/FullscreenWrapper";
import Form from "../components/Form";
import InputGroup from "../components/InputGroup";
import SubmitButton from "../components/SubmitButton";
import Logo from "../components/Logo";

export default function login() {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
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
        body: JSON.stringify({ ...inputs, authType: "login" }),
      });

      const resultJSON = await result.json();

      if (resultJSON.message === "Logged in!") {
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
          <Logo type="big" margin="0 auto 50px auto" />

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

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  if (token) {
    const result = await fetch("http://localhost:3000/api/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resultJSON = await result.json();
    if (resultJSON.message === "Logged in") {
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
