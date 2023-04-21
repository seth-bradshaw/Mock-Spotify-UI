import React from "react";
import { resumePlayer } from "../../../../services";
import PlayIcon from "../../../common/PlayIcon";
import BaseControl from "../../../playback/controls/BaseControl";
import { msToMinutesAndSeconds } from "../../../playback/controls/PlaybackBar";

type Props = {
  imgSrc: string;
  trackTitle: string;
  duration: number;
  spotify_uri: string;
  explicit?: boolean;
  rank?: number;
};

export default function TrackCard({
  rank,
  imgSrc,
  trackTitle,
  duration,
  explicit = false,
  spotify_uri,
}: Props) {
  const playTrack = async () => {
    await resumePlayer({ uris: [spotify_uri] });
  };
  return (
    <div className="w-full h-14 bg-transparent group" onClick={playTrack}>
      <div className="bg-transparent group-hover:bg-spotify-gray-600 p-4 flex justify-between items-center w-full h-full">
        <div className="flex gap-4 items-center overflow-hidden w-4/5">
          {
            rank && (<p className="text-spotify-gray-200 group-hover:hidden w-4 h-4">
              {rank}
            </p>)
          }
          <BaseControl
            clickHandler={console.log("")}
            className="hidden bg-transparent group-hover:flex w-4 h-4"
          >
            <PlayIcon isPlaying={false} className="text-white w-4" />
          </BaseControl>
          <img
            src={imgSrc}
            className="h-10 w-10 rounded"
            alt="Image of album track is from."
          />
          <div className="flex flex-col gap-1 text-white font-bold text-base w-min overflow-hidden">
            <p className="truncate text-ellipsis">{trackTitle}</p>
            {explicit && (
              <button className="rounded-sm bg-spotify-gray-300 w-4 h-4 flex items-center justify-center p-1 text-spotify-gray-800 text-xs font-normal">
                E
              </button>
            )}
          </div>
        </div>
        <p className="text-spotify-gray-200">
          {msToMinutesAndSeconds(duration)}
        </p>
      </div>
    </div>
  );
}
