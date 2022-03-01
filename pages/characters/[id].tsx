import React, { useContext, useEffect } from "react";
import type { GetServerSideProps } from "next";
import Image from "next/image";
import type { Episode } from "../../generated";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { FavListContext } from "../../context/FavListContext";
import { favListContextType } from "../../context/FavListContext";
import { useGetCharacterQuery } from "../../generated";
import { useRouter } from "next/router";
import EpisodeList from "../../components/EpisodeList";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";
import { table } from "../api/utils/Airtable";

type FavList = {
  favList: string;
  ID: string;
};

const CharacterPage = ({ favList, ID }: FavList) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, loading } = useGetCharacterQuery({
    variables: { userID: id as string },
  });
  const { favoriteList, setFavList } = useContext(
    FavListContext
  ) as favListContextType;

  useEffect(() => {
    const favlist = favList.split(",");
    setFavList(favlist);
  }, []);

  if (loading) return <div></div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="grid max-w-5xl grid-cols-1 px-5 py-24 mx-auto md:grid-cols-2 ">
      <div className="col-span-1 mb-24 text-left">
        <ul>
          <li className="m-6">
            <div className="secondary-t">
              <div className="flex flex-col w-full ">
                <Link href="/">
                  <span className="max-w-xs mt-6 font-semibold uppercase hover:underline hover:cursor-pointer spacing-wide">
                    Go back
                  </span>
                </Link>
                <span className="mt-6 font-normal text-gray-400 uppercase spacing-wide">
                  Character Overview
                </span>
              </div>

              <div className="flex items-center justify-between mt-6 font-bold ">
                <div>
                  <span className="text-4xl uppercase ">
                    {data?.character?.name}
                  </span>{" "}
                  <br></br>
                  <span className="text-lg font-semibold ">
                    {data?.character?.species}
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li className="m-6 mt-12">
            <div>
              <span className="font-normal text-gray-400 uppercase spacing-wide">
                Gender
              </span>
              <div className="mt-2 text-lg font-normal ">
                <ul>
                  <li>{data?.character?.gender}</li>
                </ul>
              </div>
            </div>
          </li>
          <li className="m-6 mt-12">
            <div>
              <span className="font-normal text-gray-400 uppercase spacing-wide">
                Origin
              </span>
              <div className="flex flex-wrap mt-2 text-lg font-normal ">
                {data?.character?.origin?.name}
              </div>
            </div>
          </li>

          <li className="m-6 mt-12">
            <div>
              <span className="font-normal text-gray-400 uppercase spacing-wide">
                location
              </span>
              <div className="flex flex-wrap mt-2 text-lg font-normal ">
                {data?.character?.location?.name}
              </div>
            </div>
          </li>
          <li className="m-6 mt-12">
            <div>
              <span className="font-normal text-gray-400 uppercase spacing-wide">
                status
              </span>
              <div className="flex flex-wrap mt-2 text-lg font-normal ">
                {data?.character?.status}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center h-full mb-12 md:mb-0">
        <Image
          className="object-cover object-center mx-auto border border-gray-200 shadow-lg rounded-3xl"
          width="400"
          height="400"
          src={data?.character?.image as string}
        />
        {favoriteList.includes(id as string) ? (
          <IoIosHeart className="mt-6" style={{ color: "red" }}></IoIosHeart>
        ) : (
          <IoIosHeartEmpty
            className="mt-6"
            style={{ color: "red" }}
          ></IoIosHeartEmpty>
        )}
      </div>

      <div className="col-span-1 md:col-span-2">
        <EpisodeList
          episodes={data?.character?.episode as Episode[]}
        ></EpisodeList>
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
            ID: JSON.parse(JSON.stringify(id)),
          },
        };
      } catch (err) {
        console.log(err);
      }
    }

    return {
      props: {
        favList: res[0].fields.favList,
        ID: JSON.parse(JSON.stringify(res[0].id)),
      },
    };
  }

  return {
    props: {
      favList: " ",
    },
  };
};

export default CharacterPage;
