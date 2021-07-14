import { useRouter } from "next/router";
export default function Home({ result }) {
  const router = useRouter();
  const handleLogout = async () => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://netflix-clone-inky-five.vercel.app";
    const result = await fetch(`${url}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authType: "logout" }),
    });
    const resultJSON = await result.json();
    if (resultJSON.message === "Logged out") {
      router.push("/login");
    }
  };
  return (
    <div>
      <h1>Netflix Clone</h1>
      <p>Result: {JSON.stringify(result)}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let { token } = context.req.cookies;
  let url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://netflix-clone-inky-five.vercel.app";
  if (token) {
    let result = await fetch(`${url}/api/movies`, {
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
