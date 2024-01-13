import { useMemo } from "react";
import { useSelector } from "../../store/hooks";
import { getActiveArtist, getFollowedArtists } from "../../store/slices/artist/artist.selectors";

const useIsFollowingArtist = (id?: string) => {
    const artist = useSelector(getActiveArtist);
    const followedArtists = useSelector(getFollowedArtists)

    const artistId = id ?? artist?.id
    
    const isFollowing = useMemo(() => Boolean(followedArtists.artists.find((a) => a.id === artistId)), [artistId, followedArtists]);
    
    return isFollowing;
}

export default useIsFollowingArtist;