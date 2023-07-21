import React, { useEffect } from "react";
import useSearchContext from "./useSearchContext";
import CardWithDescription, { ImageSize } from "../ViewLayout/CardWithDescription";
import TrackCard from "../ViewLayout/TrackCard";
import Section from "../ViewLayout/Section";
import { formatAlbumDescription } from "../Artist/Artist";
import CardRow from "../ViewLayout/CardRow";
import { useNavigate } from "react-router";
import { extractId } from "../../../../services";

type Props = {};

export default function SearchResults({}: Props) {
  const { results, type, query } = useSearchContext();
  const navigate = useNavigate();

  const descriptionMap = {
    artist: (_:any) => 'Artist',
    playlist: (item) => `By ${item.owner.display_name}`,
    album: (item) => formatAlbumDescription(item)
  }

  if (!results || !query) {
    return null;
  }

  const handleNavigate = (url: string) => {
    navigate(`/home/${url}`);
  }

  return (
    <div className="mt-28 p-4">
      {!type ? (
        <>
          <Section title="Songs">
            <CardRow className="flex-col">
              {results.tracks.items.slice(0, 5).map((track) => (
                <TrackCard
                  trackTitle={track.name}
                  imgSrc={track.album.images.at(-1).url}
                  duration={track.duration_ms}
                  explicit={track.explicit}
                  spotify_uri={track.uri}
                />
              ))}
            </CardRow>
          </Section>
          <Section title="Artists">
            <CardRow className="flex-wrap">
              {results.artists.items.slice(0, 6).map((artist) => (
                <CardWithDescription
                  imgSize={ImageSize.sm}
                  imgSrc={artist.images.at(0)?.url}
                  label={artist.name}
                  description="Artist"
                  handleRedirect={() => handleNavigate(`artist/${extractId(artist.uri)}`)}
                  spotify_uri={artist.uri}
                />
              ))}
            </CardRow>
          </Section>
          <Section title="Albums">
            <CardRow className="flex-wrap">
              {results.albums.items.slice(0, 6).map((album) => (
                <CardWithDescription
                  imgSize={ImageSize.sm}
                  imgSrc={album.images.at(0).url}
                  label={album.name}
                  description={formatAlbumDescription(album)}
                  handleRedirect={() => handleNavigate(`album/${extractId(album.uri)}`)}
                  spotify_uri={album.uri}
                />
              ))}
            </CardRow>
          </Section>
          <Section title="Playlists">
            <CardRow className="flex-wrap">
              {results.playlists.items.slice(0, 6).map((playlist) => (
                <CardWithDescription
                  imgSize={ImageSize.sm}
                  imgSrc={playlist.images.at(0).url}
                  label={playlist.name}
                  description={`By ${playlist.owner.display_name}`}
                  handleRedirect={() => handleNavigate(`playlist/${extractId(playlist.uri)}`)}
                  spotify_uri={playlist.uri}
                />
              ))}
            </CardRow>
          </Section>
        </>
      ) : type !== "track" ? (
        <Section title={type.slice(0, 1).toUpperCase() + type.slice(1) + "s"}>
          <CardRow className="flex-wrap">
            {results.items.map((item) => (
              <CardWithDescription
                imgSize={ImageSize.sm}
                imgSrc={item.images.at(0).url}
                label={item.name}
                description={descriptionMap[type](item)}
                handleRedirect={() => handleNavigate(`${type}/${extractId(item.uri)}`)}
                spotify_uri={item.uri}
              />
            ))}
          </CardRow>
        </Section>
      ) : (
        <Section title="Songs">
          <CardRow className="flex-col">
            {results.items.map((track) => (
              <TrackCard
                trackTitle={track.name}
                imgSrc={track.album.images.at(-1).url}
                duration={track.duration_ms}
                explicit={track.explicit}
                spotify_uri={track.uri}
              />
            ))}
          </CardRow>
        </Section>
      )}
    </div>
  );
}
