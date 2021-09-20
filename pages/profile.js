import { useContext } from "react";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
import NavBar from "../components/NavBar/NavBar";
import Profile from "../containers/Profile/Profile";
import ProjectContext from "../context/Project-context";
export default function profile() {
  const context = useContext(ProjectContext);
  const { userData } = context;
  return (
    <>
      <NavBar />
      <MobileNavBar />
      <Profile userData={userData} />
    </>
  );
}
