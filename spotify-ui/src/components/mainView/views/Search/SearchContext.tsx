import { createContext, PropsWithChildren, useEffect, useState } from "react";
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
  const [query, setQuery] = useState<string>('');

  const fetchSearchResults = async () => {
    const response = await searchQuery(query, type ?? [FilterTypes.Alb, FilterTypes.Art, FilterTypes.Pst, FilterTypes.Trk].toString());
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

  useEffect(() => {
    if (query) {
      fetchSearchResults()
    } else {
      clearResults()
    }
  }, [query])

  return (
    <SearchContext.Provider value={{ results: type ? filteredResults : results, type, fetchSearchResults, applyFilter, clearResults, query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
