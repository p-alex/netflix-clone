import Link from "next/link";

import FullscreenWrapper from "../../../components/FullscreenWrapper";

import styles from "../../../styles/Verify.module.css";
export default function verify({ message }) {
  return (
    <FullscreenWrapper bgImg={"url(/images/bg/auth-bg.jpg)"}>
      <main className={styles.container}>
        <div className={styles.logo}>
          <img src="/images/logo/netflix-logo.png" alt="" />
        </div>
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
  const result = await fetch("http://localhost:3000/api/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: context.query.id }),
  });

  const resultJSON = await result.json();

  return {
    message: resultJSON.message,
  };
};
