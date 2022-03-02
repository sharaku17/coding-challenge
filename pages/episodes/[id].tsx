import React from "react";
import Image from "next/image";
import { Episode, useGetEpisodesQuery } from "../../generated";
import { Character } from "../../types";
import { useGetCharacterQuery } from "../../generated";
import { useRouter } from "next/router";
import EpisodeList from "../../components/EpisodeList";
import Link from "next/link";
import { motion } from "framer-motion";

const EpisodePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, loading } = useGetEpisodesQuery({
    variables: { episodeID: id as string },
  });

  if (loading) return <div></div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-5xl px-5 py-24 mx-auto ">
      <div className="h-screen col-span-3 text-left md:col-span-1">
        <ul>
          <motion.li
            initial={{ translateY: "-100px", opacity: 0 }}
            animate={{ translateY: "0px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="m-6"
          >
            <div className="secondary-t">
              <div className="flex flex-wrap justify-between w-full ">
                <span className="mt-6 font-normal text-gray-400 uppercase spacing-wide">
                  Episode Overview
                </span>
                <Link href="/">
                  <span className="mt-6 font-semibold uppercase hover:cursor-pointer spacing-wide">
                    Go back
                  </span>
                </Link>
              </div>

              <div className="flex items-center mt-6 font-bold ">
                <div>
                  <span className="text-4xl uppercase ">
                    {data?.episode?.name}
                  </span>{" "}
                  <br></br>
                  <span className="text-lg font-semibold ">
                    {data?.episode?.episode}
                  </span>
                </div>
              </div>
            </div>
          </motion.li>
          <motion.li
            initial={{ translateY: "-100px", opacity: 0 }}
            animate={{ translateY: "0px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="m-6 mt-12"
          >
            <div>
              <span className="font-normal text-gray-400 uppercase spacing-wide">
                Air Date
              </span>
              <div className="mt-2 text-lg font-normal ">
                <ul>
                  <li>{data?.episode?.air_date}</li>
                </ul>
              </div>
            </div>
          </motion.li>
          <li className="m-6 mt-12">
            <div>
              <motion.div
                initial={{ translateY: "-100px", opacity: 0 }}
                animate={{ translateY: "0px", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="font-normal text-gray-400 uppercase spacing-wide">
                  Characters
                </span>
              </motion.div>

              <div className="flex flex-wrap mt-2 text-lg font-normal ">
                {data?.episode?.characters.map((character, i) => {
                  return (
                    <motion.div
                      initial={{ translateX: "100px", opacity: 0 }}
                      animate={{ translateX: "0px", opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                      className="w-20 h-20 m-3"
                    >
                      <Link href={`/characters/${character?.id}`}>
                        <a>
                          <Image
                            width={150}
                            height={150}
                            className="rounded-full"
                            src={character?.image as string}
                          ></Image>
                        </a>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EpisodePage;
