import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../../../store/hooks";
import {
  getActiveArtist,
  getIsArtistLoading,
} from "../../../../store/slices/artist/artist.selectors";
import useIsFollowingArtist from "../../../../hooks/artist/useIsFollowingArtist";
import fetchArtistDetails from "../../../../store/slices/artist/fetchArtistDetails";
import { useParams } from "react-router";
import { fetchPrimaryColorFromImage, resumePlayer, RgbObject } from "../../../../services";
import fetchArtistTopTracks from "../../../../store/slices/artist/fetchArtistTopTracks";
import fetchArtistAlbums from "../../../../store/slices/artist/fetchArtistAlbums";
import ViewWrapper from "../ViewLayout/ViewWrapper";
import HeaderSection from "../ViewLayout/HeaderSection";
import ActionBar from "../ViewLayout/ActionBar";
import Section from "../ViewLayout/Section";
import CardRow from "../ViewLayout/CardRow";
import CardWithDescription from "../ViewLayout/CardWithDescription";
import TrackCard from "../ViewLayout/TrackCard";

type Props = {};

export const formatAlbumDescription = (album): string => {
  if (!album) return ''
  const year = album.release_date.slice(0, 4);
  return `${year} • ${
    album.type[0].toUpperCase() + album.type.slice(1)
  }`;
};

export default function Artist({}: Props) {
  const [bg, setBg] = useState("");
  const { artistid = "" } = useParams();
  const artist = useSelector(getActiveArtist);
  const isLoading = useSelector(getIsArtistLoading);
  const dispatch = useDispatch();
  const isFollowing = useIsFollowingArtist();
  const [albums, setAlbums] = useState([]);
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    dispatch(fetchArtistDetails(artistid));
    dispatch(fetchArtistTopTracks(artistid));
    dispatch(fetchArtistAlbums(artistid));
  }, [artistid]);

  useEffect(() => {
    if (artist?.images) {
      fetchBackgroundColor();
    }
    if (artist?.albums?.items) {
      setAlbums(artist.albums.items);
    }
    if (artist?.topTracks?.tracks) {
      setTopItems(artist.topTracks.tracks)
    }
  }, [artist]);

  const fetchBackgroundColor = async () => {
    const { r, g, b }: RgbObject = await fetchPrimaryColorFromImage(
      artist.images[0].url
    );
    setBg(`rgb(${r}, ${g}, ${b})`);
  };


  const playArtist = async () => {
    await resumePlayer({ context_uri: artist.uri, uris: [] })
  }

  return (
    <ViewWrapper
      isLoading={isLoading && bg && artist?.albums?.items?.length > 0}
    >
      <HeaderSection
        header={artist?.name ?? ""}
        subheader={
          <>
            <span className="font-semibold">
              {artist?.followers?.total ?? 0}
            </span>{" "}
            followers{" "}
            <span className="text-sm italic">{`(${artist?.popularity} percentile)`}</span>
          </>
        }
        imgSrc={artist?.images ? artist.images[0].url : ''}
        backgroundColor={bg}
      />
      <div className="h-full py-2 px-4">
        <ActionBar handleClickPlay={() => playArtist()}>
          <button className="p-2 py-1 bg-transparent border border-white text-white h-min rounded-md hover">
            {isFollowing ? "Following" : "Follow"}
          </button>
        </ActionBar>
        <Section title="Popular">
          <CardRow className="flex-col">
            {topItems?.map((item, idx) => (
              <TrackCard
                spotify_uri={item.uri}
                imgSrc={item.album.images[2].url}
                trackTitle={item.name}
                duration={item.duration_ms}
                rank={idx + 1}
                explicit={item.explicit}
              />
            ))}
          </CardRow>
        </Section>
        <Section title="Discography">
          <CardRow className="grid auto-cols-auto lg:grid-cols-3 xl:grid-cols-5">
            {albums?.map((album) => (
              <CardWithDescription
                imgSrc={album.images[1].url}
                label={album.name}
                description={formatAlbumDescription(album)}
                handleRedirect={() => console.log("redirect card clicked")}
                spotify_uri={album.uri}
              />
            ))}
          </CardRow>
        </Section>
      </div>
    </ViewWrapper>
  );
}
