import { NextPage } from "next";
import React from "react";
import type { Episode } from "../generated";
import Link from "next/link";

const EpisodeList: NextPage<{ episodes: Episode[] }> = ({ episodes }) => {
  return (
    <div className="rounded-lg shadow-md dark:bg-gray-700 bg-gray-50">
      <div className="flex flex-col w-full ">
        <span className="px-4 pt-4 text-lg font-semibold text-gray-700 underline dark:text-gray-100">
          Episode List
        </span>
        <div className="flex flex-col p-2">
          {episodes.map((episode) => {
            return (
              <Link href={`/episodes/${episode.id}`}>
                <div className="mx-2 hover:underline hover:cursor-pointer ">
                  {episode.episode + " -  " + episode.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EpisodeList;
