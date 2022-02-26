import "../styles/globals.css";
import React from "react";
import OnlineStore from "../context/globalContext";

function MyApp({ Component, pageProps }) {
  return (
    <OnlineStore.Provider>
      <Component {...pageProps} />
    </OnlineStore.Provider>
  );
}

export default MyApp;
