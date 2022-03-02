import { useContext, useEffect } from "react";
import { FavListContext } from "../context/FavListContext";
import { favListContextType } from "../context/FavListContext";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { NextPage } from "next";

export const FavoriteHeart: NextPage<{
  favoriteList: string[];
  character: any;
  addFav: (id: string) => void;
}> = ({ favoriteList, character, addFav }) => {
  return (
    <>
      {favoriteList.includes(character.id as string) ? (
        <IoIosHeart
          className="hover:cursor-pointer"
          onClick={() => addFav(character.id as string)}
          style={{ color: "red" }}
        ></IoIosHeart>
      ) : (
        <IoIosHeartEmpty
          className="hover:cursor-pointer"
          onClick={() => addFav(character.id as string)}
          style={{ color: "red" }}
        ></IoIosHeartEmpty>
      )}
    </>
  );
};
