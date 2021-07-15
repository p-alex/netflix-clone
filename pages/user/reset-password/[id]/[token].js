import { useState } from "react";
import { useRouter } from "next/router";

import FullscreenWrapper from "../../../../components/FullscreenWrapper";
import Form from "../../../../components/Form";
import InputGroup from "../../../../components/InputGroup";
import SubmitButton from "../../../../components/SubmitButton";
import Logo from "../../../../components/Logo";

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
    const result = await fetch("http://localhost:3000/api/password-reset", {
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
      <main>
        <Form submitFunc={handleSubmit}>
          <Logo type="big" margin="0 auto 50px auto" maxWidth="160px" />
          <p>{feedback && feedback}</p>
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
  const result = await fetch("http://localhost:3000/api/verify-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.params.token}`,
    },
    body: JSON.stringify({ id: context.params.id }),
  });
  const resultJSON = await result.json();
  console.log(resultJSON);
  if (resultJSON.message === "Authorized") {
    return { props: {} };
  } else {
    return { redirect: { destination: "/", permanent: false }, props: {} };
  }
}
