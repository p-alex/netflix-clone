import { useState } from "react";

import FullscreenWrapper from "../../components/FullscreenWrapper";
import Form from "../../components/Form";
import InputGroup from "../../components/InputGroup";
import SubmitButton from "../../components/SubmitButton";
import Logo from "../../components/Logo";

export default function resetPasswordEmailCheck() {
  const [feedback, setFeedback] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
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
    const result = await fetch(`${url}/api/password-reset-send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
    const resultJSON = await result.json();

    if (resultJSON.message === "Sent")
      setFeedback("We sent you an email if the account exists");
  };

  return (
    <FullscreenWrapper bgImg={"url(/images/bg/auth-bg.jpg)"}>
      <main>
        <Form submitFunc={handleSubmit}>
          <Logo type="big" margin="0 auto 50px auto" />
          <p>{feedback}</p>
          <InputGroup
            setId="email"
            setLabel="E-mail"
            setName="email"
            setPlaceholder=" "
            setType="email"
            handleChangeFunc={handleChange}
          />
          <SubmitButton>Send email</SubmitButton>
        </Form>
      </main>
    </FullscreenWrapper>
  );
}
