import { useRouter } from "next/router";
import ProjectContext from "./Project-context";
const GlobalState = ({ children }) => {
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
    console.log(resultJSON);
    if (resultJSON.message === "Logged out") {
      router.push("/login");
    }
  };
  return (
    <ProjectContext.Provider value={{ handleLogout }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default GlobalState;
