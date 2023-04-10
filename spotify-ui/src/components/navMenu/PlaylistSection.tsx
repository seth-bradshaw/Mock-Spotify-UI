import { useSelector } from "../../store/hooks";
import { Link } from "react-router-dom";
import { getSavedPlaylists } from "../../store/slices/playlist/playlist.selectors";

type Props = {};

export default function PlaylistSection({}: Props) {
  const playlists = useSelector(getSavedPlaylists);

  return (
    <div className="text-spotify-gray-300 text-sm flex flex-col gap-2 overflow-hidden text-ellipsis">
      {playlists.slice(0, 11).map((playlist) => (
        <Link
          to={`playlist/${playlist.id}`}
          className="truncate hover:text-white delay-100 ease-in-out"
        >
          {playlist.name}
        </Link>
      ))}
    </div>
  );
}
