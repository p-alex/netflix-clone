import { useState } from "react";
import { useRouter } from "next/router";

import FullscreenWrapper from "../../../../components/FullscreenWrapper/FullscreenWrapper";
import Form from "../../../../components/Form/Form";
import InputGroup from "../../../../components/InputGroup/InputGroup";
import SubmitButton from "../../../../components/SubmitButton/SubmitButton";
import Logo from "../../../../components/Logo/Logo";
import Link from "next/link";
import Head from "next/head";
export default function resetPassword() {
  const router = useRouter();

  const [feedback, setFeedback] = useState("");

  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });

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
    const result = await fetch(`${url}/api/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...inputs, id: router.query.id }),
    });
    const resultJSON = await result.json();
    setFeedback(resultJSON.message);
  };
  return (
    <FullscreenWrapper bgImg={"url(/images/bg/auth-bg.jpg)"}>
      <Head>
        <title>Netflix Clone | Reset Password</title>
      </Head>
      <main>
        <Form submitFunc={handleSubmit}>
          <Logo type="big" margin="0 auto 50px auto" maxWidth="160px" />
          <p>{feedback && feedback}</p>
          {feedback === "Success" && <Link href="/login">Login</Link>}
          <InputGroup
            setId="password"
            setLabel="New password"
            setName="password"
            setPlaceholder=" "
            setType="password"
            handleChangeFunc={handleChange}
          />
          <InputGroup
            setId="confirmPassword"
            setLabel="Confirm new password"
            setName="confirmPassword"
            setPlaceholder=" "
            setType="password"
            handleChangeFunc={handleChange}
          />
          <SubmitButton>Reset password</SubmitButton>
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
  const result = await fetch(`${url}/api/verify-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.params.token}`,
    },
  });
  const resultJSON = await result.json();
  console.log(resultJSON.message);
  if (resultJSON.message !== "Authorized")
    return { redirect: { destination: "/login", permanent: false }, props: {} };
  return { props: {} };
}
