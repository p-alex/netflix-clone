import { useContext } from "react";
import Profile from "../containers/Profile/Profile";
import ProjectContext from "../context/Project-context";
import Head from "next/head";
import Layout from "../layout/layout";
export default function profile() {
  const context = useContext(ProjectContext);
  const { userData } = context;
  return (
    <Layout>
      <Head>
        <title>Netflix Clone | {`${userData.username}'s Profile`}</title>
      </Head>
      <Profile userData={userData} />
    </Layout>
  );
}
