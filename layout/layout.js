import { useEffect, useContext } from "react";
import ProjectContext from "../context/Project-context";
import NavBar from "../components/NavBar/NavBar";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
import FullscreenLoader from "../components/FullscreenLoader/FullscreenLoader";
import Modal from "../components/Modal/Modal";
import Footer from "../components/Footer/Footer";
export default function Layout({ children }) {
  const context = useContext(ProjectContext);
  const { selectedMovie, allMovies, isLoading, handleGetAllMovies } = context;
  useEffect(() => {
    if (allMovies.length === 0) handleGetAllMovies();
  }, []);
  return (
    <>
      {isLoading && <FullscreenLoader />}
      {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
      <NavBar />
      <MobileNavBar />
      {children}
      <Footer />
    </>
  );
}
