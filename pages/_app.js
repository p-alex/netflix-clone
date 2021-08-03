import GlobalState from "../context/GlobalState";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalState>
      <div style={{ overflowX: "hidden" }}>
        <Component {...pageProps} />
      </div>
    </GlobalState>
  );
}

export default MyApp;
