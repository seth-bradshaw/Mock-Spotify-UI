import React, { useEffect, useState } from "react";
import useSearchContext from "./useSearchContext";
import Filters from "./Filters";

type Props = {};

export default function SearchHeader({}: Props) {
  const { clearResults, query, setQuery } = useSearchContext();

  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      clearResults()
    }
    setQuery(e.target.value);
  };

  return (
    <div className="w-full fixed h-48 bg-transparent flex flex-col top-0 z-[9999]">
      <div className="w-full h-16 flex items-center relative">
        <label className="relative block w-96">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-36 flex items-center pl-2">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            value={query}
            onChange={handleChange}
            className="ml-36 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none sm:text-sm"
            placeholder="What do you want to listen to?"
            type="text"
            name="search"
          />
        </label>
      </div>
      <Filters />
    </div>
  );
}
