import React, { useEffect, useState } from "react";
import useSearchContext from "./useSearchContext";

type Props = {};

export default function Filters({}: Props) {
  const { results, type, applyFilter, query } = useSearchContext();
  const filters = [
    { displayName: "All", type: null },
    { displayName: "Albums", type: "album" },
    { displayName: "Artists", type: "artist" },
    { displayName: "Songs", type: "track" },
    { displayName: "Playlists", type: "playlist" },
  ];

  return (
    results && query && (
      <div className="h-12 w-full flex gap-2 pl-5 mt-5 -left-28 absolute">
        {filters.map((filter) => (
          <div
            className={`p-3 py-1 ${
              type === filter.type
                ? "bg-white text-black"
                : "bg-spotify-gray-650 text-white hover:bg-spotify-gray-600"
            } flex items-center text-md rounded-full h-min hover:cursor-pointer`}
            onClick={() => applyFilter(filter.type)}
          >
            {filter.displayName}
          </div>
        ))}
      </div>
    )
  );
}
