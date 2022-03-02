import "../styles/globals.css";
import type { AppProps } from "next/app";
import ApolloProv from "../graphql/apollo";
import { IconContext } from "react-icons";
import { UserProvider } from "@auth0/nextjs-auth0";
import { FavListProvider } from "../context/FavListContext";
import { ThemeProvider } from "next-themes";
import { animate, motion } from "framer-motion";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ApolloProv>
      <ThemeProvider attribute="class">
        <UserProvider>
          <FavListProvider>
            <motion.div
              key={router.route}
              initial="initial"
              animate="animate"
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { duration: 1 } },
              }}
            >
              <IconContext.Provider value={{ color: "red", size: "2rem" }}>
                <Component {...pageProps} />
              </IconContext.Provider>{" "}
            </motion.div>
          </FavListProvider>
        </UserProvider>
      </ThemeProvider>
    </ApolloProv>
  );
}

export default MyApp;
