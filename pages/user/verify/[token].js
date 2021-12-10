import Link from "next/link";

import FullscreenWrapper from "../../../components/FullscreenWrapper/FullscreenWrapper";
import Logo from "../../../components/Logo/Logo";

import styles from "../../../styles/Verify.module.css";
import Head from "next/head";
export default function verify({ message }) {
  return (
    <FullscreenWrapper>
      <Head>
        <title>Netflix Clone | Verify Email</title>
      </Head>
      <main className={styles.container}>
        <Logo type="big" margin="0 auto 50px auto" maxWidth="160px" />
        <p>{message}</p>
        <br />
        {message === "Verification Successful!" ||
        message === "Your account is already verified!" ? (
          <Link href="/login">Login</Link>
        ) : null}
      </main>
    </FullscreenWrapper>
  );
}

verify.getInitialProps = async (context) => {
  let url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://netplix-inky-five.vercel.app/";
  const result = await fetch(`${url}/api/verify-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: context.query.token }),
  });

  const resultJSON = await result.json();

  return {
    message: resultJSON.message,
  };
};
