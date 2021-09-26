import { useContext } from "react";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
import NavBar from "../components/NavBar/NavBar";
import Profile from "../containers/Profile/Profile";
import ProjectContext from "../context/Project-context";
import Head from "next/head";
export default function profile() {
  const context = useContext(ProjectContext);
  const { userData } = context;

  return (
    <>
      <Head>
        <title>Netflix Clone | {`${userData.username}'s Profile`}</title>
      </Head>
      <NavBar />
      <MobileNavBar />
      <Profile userData={userData} />
    </>
  );
}
