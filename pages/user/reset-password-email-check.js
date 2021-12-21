import { useState } from "react";

import FullscreenWrapper from "../../components/FullscreenWrapper/FullscreenWrapper";
import Form from "../../components/Form/Form";
import InputGroup from "../../components/InputGroup/InputGroup";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Logo from "../../components/Logo/Logo";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/ResetPasswordEmailCheck.module.css";
import Spinner from "../../components/Spinner/Spinner";
export default function resetPasswordEmailCheck() {
  const [feedback, setFeedback] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleResetInputs = () => setInputs({ email: "" });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://netplix-inky-five.vercel.app/";
    const result = await fetch(`${url}/api/password-reset-send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
    const resultJSON = await result.json();
    console.log(resultJSON.message);

    handleResetInputs();
    setIsLoading(false);
    setFeedback(resultJSON.message);
  };

  return (
    <FullscreenWrapper>
      <Head>
        <title>Netflix Clone | Reset password</title>
      </Head>
      <main className={styles.resetPasswordEmailCheck}>
        <Form submitFunc={handleSubmit}>
          <Logo type="big" margin="0 auto 50px auto" maxWidth="160px" />
          <p>{feedback}</p>
          <InputGroup
            setId="email"
            setLabel="E-mail"
            setName="email"
            setPlaceholder=" "
            setType="email"
            handleChangeFunc={handleChange}
            autoFocus={true}
            inputValue={inputs.email}
          />
          <SubmitButton isDisabled={isLoading} isTypeSubmit={true}>
            {isLoading ? <Spinner /> : "Send email"}
          </SubmitButton>
          <p>
            <Link href="/login">Go Back</Link>
          </p>
        </Form>
      </main>
    </FullscreenWrapper>
  );
}
