import "../styles/globals.css";
import type { AppProps } from "next/app";
import ApolloProv from "../graphql/apollo";
import { IconContext } from "react-icons";
import { UserProvider } from "@auth0/nextjs-auth0";
import { FavListProvider } from "../context/FavListContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProv>
      {" "}
      <UserProvider>
        <FavListProvider>
          <IconContext.Provider value={{ color: "red", size: "2rem" }}>
            <Component {...pageProps} />
          </IconContext.Provider>{" "}
        </FavListProvider>
      </UserProvider>
    </ApolloProv>
  );
}

export default MyApp;
