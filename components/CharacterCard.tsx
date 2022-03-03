import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const CharacterCard = ({ characterData, favoriteList, addFav }: any) => {
  return (
    <>
      {characterData?.characters?.results?.map((character: any, i: number) => {
        return (
          <div key={character?.id}>
            <motion.div
              initial={{ opacity: 0, translateX: -40 }}
              animate={{
                opacity: 1,
                translateX: 0,
                transition: {
                  duration: 0.4,
                  delay: i * 0.1,
                },
              }}
              whileHover={{ scale: 0.9, transition: { delay: 0 } }}
              className="flex flex-col max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-800 dark:bg-gray-700 "
            >
              <Link href={`characters/${character?.id}`}>
                <div className="w-full hover:cursor-pointer">
                  <Image
                    src={character?.image as string}
                    alt={character?.name as string}
                    width="310"
                    height="300"
                    className="w-full rounded-t-lg"
                  />
                </div>
              </Link>

              <div className="flex flex-col p-5 ">
                <div className="flex justify-between">
                  <Link href={`characters/${character?.id}`}>
                    <p className="text-xl font-semibold hover:cursor-pointer">
                      {character?.name}
                    </p>
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    {favoriteList.includes(character?.id as string) ? (
                      <IoIosHeart
                        className="hover:cursor-pointer"
                        onClick={() => addFav(character?.id as string)}
                        style={{ color: "red" }}
                      ></IoIosHeart>
                    ) : (
                      <IoIosHeartEmpty
                        className="hover:cursor-pointer"
                        onClick={() => addFav(character?.id as string)}
                        style={{ color: "red" }}
                      ></IoIosHeartEmpty>
                    )}
                  </motion.div>
                </div>
                <p>{character?.species}</p>
                <p>{character?.gender}</p>
                <p>{character?.location?.name}</p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </>
  );
};

export default CharacterCard;
