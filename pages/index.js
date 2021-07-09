import { useState } from "react";

export default function Home({ result }) {
  return (
    <div>
      <h1>Netflix Clone</h1>
      <p>Result: {JSON.stringify(result)}</p>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let { token } = context.req.cookies;
  if (token) {
    let result = await fetch("http://localhost:3000/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let resultJSON = await result.json();
    if (resultJSON.message === "Not allowed") {
      return {
        redirect: {
          destination: "/login",
          permanent: true,
        },
      };
    }
    return {
      props: {
        result: resultJSON,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: {},
    };
  }
};
