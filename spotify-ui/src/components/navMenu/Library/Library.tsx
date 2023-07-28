import useLibraryContext from "./context/useLibraryContext";
import LibraryItem from "./LibraryItem";
import Filters from "./Filters";
import { useState } from "react";

type Props = {
  expanded: boolean
  toggleMenu: () => void
};

export default function Library({ expanded, toggleMenu }: Props) {
  const { results } = useLibraryContext();

  return (
    <div className={`text-spotify-gray-300 text-sm flex flex-col gap-2 bg-spotify-gray-800 rounded-lg p-4 h-full overflow-x-hidden ${!expanded ? 'p-0 w-full' : ''}`}>
      <div className={`hover:text-white flex gap-2 items-center delay-100 ease-in-out w-full text-xl ${!expanded ? 'p-2 justify-center h-16 mb-2' : ''}`} onClick={toggleMenu}>
        <div className="w-5 flex justify-center">
          <i className={`fa-solid fa-bookmark ${!expanded ? 'fa-xl' : ''}`}></i>
        </div>
        { expanded && <p>Your Library</p> }
      </div>
      { expanded && <Filters /> }
      <div className={`relative flex flex-col gap-2 overflow-x-hidden text-ellipsis bg-spotify-gray-800 rounded-lg w-full ${expanded ? 'p-4' : 'items-center justify-center' }overflow-y-scroll h-full`}>
        {results && results.map((result) => <LibraryItem item={result} expanded={expanded} /> )}
      </div>
    </div>
  );
}
