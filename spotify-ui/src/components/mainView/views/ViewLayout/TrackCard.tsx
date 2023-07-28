import { extractId, resumePlayer } from "../../../../services";
import PlayIcon from "../../../common/PlayIcon";
import BaseControl from "../../../playback/controls/BaseControl";
import { msToMinutesAndSeconds } from "../../../playback/controls/PlaybackBar";
import { useNavigate } from "react-router";

type Props = {
  imgSrc: string;
  trackTitle: string;
  duration: number;
  spotify_uri: string;
  explicit?: boolean;
  rank?: number;
  artists?: Array<any>;
};

export default function TrackCard({
  rank,
  imgSrc,
  trackTitle,
  duration,
  explicit = false,
  spotify_uri,
  artists = [],
}: Props) {
  const navigate = useNavigate();
  const playTrack = async () => {
    await resumePlayer({ uris: [spotify_uri] });
  };

  const openArtistDetails = (uri: string) => {
    navigate(`/home/artist/${extractId(uri)}`);
  };

  return (
    <div
      className="w-full h-14 bg-transparent group relative z-10"
      onClick={playTrack}
    >
      <div className="bg-transparent group-hover:bg-spotify-gray-600 p-4 flex justify-between items-center w-full h-full">
        <div className="flex gap-4 items-center overflow-hidden w-4/5">
          {rank ? (
            <>
              <p className="text-spotify-gray-200 group-hover:hidden w-4 h-4">
                {rank}
              </p>

              <BaseControl
                clickHandler={console.log("")}
                className="hidden bg-transparent group-hover:flex w-4 h-4"
              >
                <PlayIcon isPlaying={false} className="text-white w-4" />
              </BaseControl>
            </>
          ) : (
            <div className="bg-transparent block group absolute z-50 top-[15px] h-full w-full left-0">
              <button className="button flex absolute rounded-full invisible group-hover:visible h-6 w-6 items-center justify-center left-[20px] z-50">
                <PlayIcon isPlaying={false} className="text-white w-4" />
              </button>
            </div>
          )}
          <img
            src={imgSrc}
            className="h-10 w-10 rounded"
            alt="Image of album track is from."
          />
          <div className="flex flex-col gap-1 text-white font-bold text-base w-max overflow-hidden">
            <p className="truncate text-ellipsis">{trackTitle}</p>
            <div className="w-full flex h-4 gap-1 items-center">
              {explicit && (
                <button className="rounded-sm bg-spotify-gray-300 w-4 h-4 flex items-center justify-center p-1 text-spotify-gray-800 text-xs font-normal">
                  E
                </button>
              )}
              {artists && (
                <div className="text-sm font-normal w-full z-40">
                  {artists?.map((curr, idx) => {
                    return (
                      <>
                        <a
                          onClick={(e) => {
                            e.stopPropagation()
                            openArtistDetails(curr.uri)
                          }}
                          className="hover:underline z-50 hover:cursor-pointer"
                        >
                          {curr.name}
                        </a>
                        {idx === artists.length - 1 ? "" : ", "}
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-spotify-gray-200">
          {msToMinutesAndSeconds(duration)}
        </p>
      </div>
    </div>
  );
}
