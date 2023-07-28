import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "../../../../store/hooks";
import { getSavedPlaylists } from "../../../../store/slices/playlist/playlist.selectors";
import { getFollowedArtists } from "../../../../store/slices/artist/artist.selectors";
import { getSavedAlbums } from "../../../../store/slices/album/album.selectors";
import normalizeItems from "../normalizeItems";


export const LibraryContext = createContext({});

enum FilterOpts {
    artists = 'artists',
    playlists = 'playlists',
    albums = 'albums'
}

type Filter = FilterOpts | null

export default function LibraryContextProvider ({ children }: PropsWithChildren) {
    const { artists } = useSelector(getFollowedArtists);
    const playlists = useSelector(getSavedPlaylists);
    const albums = useSelector(getSavedAlbums);
    const normalized = useMemo(() => normalizeItems({ artists, playlists, albums }), [artists, playlists, albums]);
    const [results, setResults] = useState<Array<any>>();
    const [filter, setFilter] = useState<Filter>(null);

    useEffect(() => {
        if (!filter) {
            setResults(Object.keys(normalized).reduce((acc, key) => acc.concat(normalized[key]),[]))
        } else {
            setResults(normalized[filter])
        }
    }, [normalized, filter])

    const applyFilter = (filterOpt: Filter) => {
        if (filterOpt === filter) {
            setFilter(null)
        } else {
            setFilter(filterOpt)
        }
    }

    return (
        <LibraryContext.Provider value={{ artists, playlists, albums, results, applyFilter }}>
            {children}
        </LibraryContext.Provider>
    )
}