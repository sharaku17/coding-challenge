// Load Imports

import type { GetServerSideProps } from "next";
import { useEffect, useState, useContext } from "react";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Episode, useCharactersQuery, useEpisodesQuery } from "../generated";
import EpisodeList from "../components/EpisodeList";

import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { table } from "./api/utils/Airtable";
import { useUser } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import { FavListContext } from "../context/FavListContext";
import { favListContextType } from "../context/FavListContext";
import { useTheme } from "next-themes";
import LoginPage from "../components/LoginPage";
import Pagination from "../components/Pagination";
import CharacterCard from "../components/characterCard";

// Type Definitions

type FavList = {
  favList: string;
  id: string;
};

const Home = ({ favList, id }: FavList) => {
  // Define States
  const [showCharacters, setShowCharacters] = useState(true);
  const [episodePage, setEpisodePage] = useState(1);
  const [characterPage, setCharacterPage] = useState(1);
  const [favoritesList, setFavoritesList] = useState<String[]>([]);

  // Use Hooks
  const { theme, setTheme } = useTheme();
  const { favoriteList, setFavList, tableID, setTableID } = useContext(
    FavListContext
  ) as favListContextType;
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const favlist = favList.split(",");
    setFavList(favlist);
    setTableID(id);
  }, []);

  // Fetch Character and Episode Data by using Apollo Hooks
  const {
    data: characterData,
    error: characterError,
    loading: characterLoading,
  } = useCharactersQuery({ variables: { page: characterPage as number } });
  const {
    data: episodeData,
    error: episodeError,
    loading: episodeLoading,
  } = useEpisodesQuery({ variables: { page: episodePage as number } });

  // Functions to update Favorite List and also update Database
  const updateFavList = async (updatedFavList: string[]) => {
    try {
      const res = await fetch("/api/addFav", {
        method: "PUT",
        body: JSON.stringify({ favList: updatedFavList.toString(), id: id }),
        headers: { "Content-Type": "application/json" },
      });

      await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  const addFav = (charID: string) => {
    let arr: any[] = favoriteList;
    let addArray: boolean = true;
    arr.map((item: any, key: number) => {
      if (item == charID) {
        arr.splice(key, 1);
        addArray = false;
      }
    });
    if (addArray) {
      arr.push(charID);
    }
    setFavList([...arr] as never[]);
    updateFavList(arr);
  };

  // Check if Character Data is loaded or an error occured

  if (characterError) {
    return <div>{characterError.message}</div>;
  }

  // Check if User is logged in, if not, tell him to login

  if (!user) {
    return (
      <div>
        <Head>
          <title>Rick and Morty App</title>
          <meta
            name="Rick and Morty Character and Episode App"
            content="Generated by create next app"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LoginPage></LoginPage>
      </div>
    );
  }

  // Display Page when user is logged in

  return (
    <div>
      <Head>
        <title>Rick and Morty App</title>
        <meta
          name="Rick and Morty Character and Episode App"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-5xl mx-auto">
        <div className="w-full p-12 ">
          <div className="">
            <div className="flex justify-end mb-12">
              <img
                src={user.picture as string}
                className="w-12 h-12 my-5 mr-4 rounded-full"
              ></img>
              <a
                href="./api/auth/logout"
                className="px-6 py-3 my-5 text-white bg-blue-500 rounded hover:bg-blue-600 "
              >
                {" "}
                Logout
              </a>
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="mx-5"
              >
                {theme === "light" ? (
                  <BsFillMoonStarsFill
                    style={{ color: "black" }}
                  ></BsFillMoonStarsFill>
                ) : (
                  <BsFillSunFill style={{ color: "white" }}></BsFillSunFill>
                )}
              </button>
            </div>
          </div>
          <h1 className="mx-auto text-5xl font-bold text-center ">
            Rick and Morty App
          </h1>
          <div className="mt-10 mb-4 border-b border-gray-200">
            <ul className="flex flex-wrap justify-center -mb-px ">
              <li className="mr-2">
                <button
                  onClick={() => setShowCharacters(true)}
                  className={`inline-block px-4 py-4 text-sm font-medium text-center ${
                    showCharacters
                      ? "text-indigo-600 dark:text-indigo-300"
                      : "text-gray-500 dark:text-white hover:text-gray-600"
                  }  border-b-2 border-transparent rounded-t-lg  ${
                    showCharacters
                      ? "border-indigo-600 dark:border-indigo-500"
                      : " hover:border-gray-300"
                  }`}
                >
                  Characters
                </button>
              </li>
              <li className="mr-2">
                <button
                  onClick={() => setShowCharacters(false)}
                  className={`inline-block px-4 py-4 text-sm font-medium text-center ${
                    !showCharacters
                      ? "text-indigo-600 dark:text-indigo-300"
                      : "text-gray-500 dark:text-white hover:text-gray-600"
                  }  border-b-2 border-transparent rounded-t-lg  ${
                    !showCharacters
                      ? "border-indigo-600 dark:border-indigo-500"
                      : " hover:border-gray-300"
                  }`}
                >
                  Episodes
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {showCharacters && (
            <Pagination
              characterData={characterData}
              characterPage={characterPage}
              setCharacterPage={setCharacterPage}
            ></Pagination>
          )}
          {showCharacters && characterData && (
            <CharacterCard
              characterData={characterData}
              favoriteList={favoriteList}
              addFav={addFav}
            ></CharacterCard>
          )}
          {!showCharacters && (
            <Pagination
              characterData={episodeData}
              characterPage={episodePage}
              setCharacterPage={setEpisodePage}
            ></Pagination>
          )}
          {!showCharacters && episodeData && (
            <motion.div
              initial={{ translateY: "100px", opacity: 0 }}
              animate={{ translateY: "0px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="col-span-3"
            >
              <EpisodeList
                episodes={episodeData?.episodes?.results as Episode[]}
              ></EpisodeList>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession(context.req, context.res);
  if (session) {
    const res = await table
      .select({
        filterByFormula: `{userID} = "${session?.user.nickname}"`,
      })
      .firstPage();

    if (!res[0]) {
      console.log("its in");
      try {
        const createdRecords = await table.create([
          {
            fields: {
              favList: "",
              userID: session?.user.nickname,
            },
          },
        ]);

        const id = createdRecords[0].id;
        console.log(id);
        return {
          props: {
            favList: "",
            id: JSON.parse(JSON.stringify(id)),
          },
        };
      } catch (err) {
        console.log(err);
      }
    }

    return {
      props: {
        favList: res[0].fields.favList,
        id: JSON.parse(JSON.stringify(res[0].id)),
      },
    };
  }

  return {
    props: {
      favList: " ",
    },
  };
};
export default Home;
