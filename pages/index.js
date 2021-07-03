import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <div>
      <h1>Netflix Clone</h1>
      <p>Welcome, {user.username}</p>
    </div>
  );
}
