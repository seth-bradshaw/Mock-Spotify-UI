import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "../../../store/hooks";
import fetchPlaylistItems from "../../../store/slices/playlist/fetchPlaylistItems";
import { getActivePlaylist } from "../../../store/slices/playlist/playlist.selectors";
import ViewWrapper from "./ViewLayout/ViewWrapper";
import HeaderSection from "./ViewLayout/HeaderSection";
import ActionBar from "./ViewLayout/ActionBar";
import Section from "./ViewLayout/Section";
import CardRow from "./ViewLayout/CardRow";
import TrackCard from "./ViewLayout/TrackCard";
import fetchPlaylistDetails from "../../../store/slices/playlist/fetchPlaylistDetails";
import { resumePlayer } from "../../../services";

type Props = {};

export default function Playlist({}: Props) {
  const params = useParams();
  const dispatch = useDispatch();
  const {
    id = "",
    name = "",
    uri = "",
    owner = {},
    images = [],
    tracks = {},
  } = useSelector(getActivePlaylist);

  useEffect(() => {
    dispatch(fetchPlaylistDetails(params.playlistid));
  }, [params.playlistid]);

  const fetchMoreTracks = () => {
    dispatch(fetchPlaylistItems({ playlist_id: id, offset: tracks.offset }));
  };

  const playPlaylist = async () => {
    await resumePlayer({ context_uri: uri });
  };

  return (
    <ViewWrapper isLoading={false}>
      <HeaderSection
        header={name}
        subheader={
          <>
            <span>{owner?.display_name ?? ""}</span> &#8226;{" "}
            <span>{tracks?.total ?? 0} songs</span>
          </>
        }
        label={"Playlist"}
        imgSrc={images.length > 0 ? images[0]?.url : ""}
      />
      <div className="h-full py-2 px-4">
        <ActionBar handleClickPlay={playPlaylist}></ActionBar>
        <Section>
          <CardRow className="flex-col">
            {tracks?.items?.map(({ track }, idx) => (
              <TrackCard
                spotify_uri={track.uri}
                imgSrc={track.album.images[2].url}
                trackTitle={track.name}
                duration={track.duration_ms}
                rank={idx + 1}
                explicit={track.explicit}
                artists={track.artists}
              />
            ))}
          </CardRow>
          {tracks.offset < tracks.total && (
            <div className="flex w-full items-center justify-center py-5">
              <button
                className="p-2 text-white bg-spotify-gray-300 rounded-lg"
                onClick={fetchMoreTracks}
              >
                View more
              </button>
            </div>
          )}
        </Section>
      </div>
    </ViewWrapper>
  );
}
