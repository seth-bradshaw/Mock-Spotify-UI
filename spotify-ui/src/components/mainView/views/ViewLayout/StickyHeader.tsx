import { useLocation, useNavigate } from "react-router";
import BaseControl from "../../../playback/controls/BaseControl";
import AccountPill from "../../../profile/AccountPill";
import SearchHeader from "../Search/SearchHeader";

type Props = {
  bgColor?: string;
  title?: string;
};

export default function Header({ bgColor = "transparent", title }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  return (
    <div className="w-full h-44 bg-transparent fixed flex flex-col top-0 z-[9998]">
      <div
        className="w-full h-14 flex justify-between fixed p-4 "
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex gap-2">
          <BaseControl
            className="rounded-full !bg-spotify-gray-800 text-white font-extrabold text-xl text-center h-10 w-10 z-10"
            clickHandler={goBack}
          >
            &lt;
          </BaseControl>
          <BaseControl
            className="rounded-full !bg-spotify-gray-800 text-white font-extrabold text-xl text-center h-10 w-10"
            clickHandler={goForward}
          >
            &gt;
          </BaseControl>
          {title ? (
            <h3 className="text-white text-lg font-bold">{title}</h3>
          ) : null}
          {location.pathname.includes("search") && <SearchHeader />}
          {/* {location.pathname.includes("album") && <div>Album</div>} */}
          {/* {location.pathname.includes("playlist") && <div>Playlist</div>} */}
        </div>
        <div>
          <AccountPill />
        </div>
      </div>
    </div>
  );
}
