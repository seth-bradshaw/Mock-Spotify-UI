import { createContext, PropsWithChildren, useState } from "react";
import { searchQuery } from "../../../../services";

export const SearchContext = createContext({});

enum FilterTypes {
  'Alb' = 'album',
  'Pst' = 'playlist',
  'Art' = 'artist',
  'Trk' = 'track',
}

export default function SearchContextProvider({ children }: PropsWithChildren) {
  const [results, setResults] = useState<any>(null); // TODO do type
  const [filteredResults, setFilteredResults] = useState<any>(null);
  const [type, setType] = useState<FilterTypes | null>(null);
  const categories = null; // TODO select from state once implemented

  const fetchSearchResults = async (q: string) => {
    const response = await searchQuery(q, type ?? [FilterTypes.Alb, FilterTypes.Art, FilterTypes.Pst, FilterTypes.Trk].toString());
    setResults(response);
  }

  const applyFilter = (filter: FilterTypes) => {
    setType(filter)
    setFilteredResults(results[filter + 's'])
  }

  const clearResults = () => {
    setResults(null)
    setFilteredResults(null)
  }

  return (
    <SearchContext.Provider value={{ results: type ? filteredResults : results, type, categories, fetchSearchResults, applyFilter, clearResults }}>
      {children}
    </SearchContext.Provider>
  );
}
