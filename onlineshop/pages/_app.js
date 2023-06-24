import "../styles/globals.css";
import React, { useEffect } from "react";
import OnlineStore from "../context/globalContext";
import Router, { useRouter } from "next/router";
import { useUserData } from "../data_utils/homePageFetch";
import Loading from "./../components/utils/Loading";
function MyApp({ Component, pageProps }) {
  const [loading, user] = useUserData();
  useEffect(() => {
    if (loading) return;
    const adminPage = Router.pathname.split("/").indexOf("admin") != -1;
    console.log(" user : " + JSON.stringify(user));
    if (adminPage) {
      if (user && user.role == "ADMIN") {
      } else
        Router.push({
          pathname: "/account/login",
          query: {
            status: "reason",
            reason:
              "This is admin restricted page please login as administrator",
          },
        });
    }
  }, [loading]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <OnlineStore.Provider value="">
        <Component {...pageProps} />
      </OnlineStore.Provider>
    );
  }
}

export default MyApp;
