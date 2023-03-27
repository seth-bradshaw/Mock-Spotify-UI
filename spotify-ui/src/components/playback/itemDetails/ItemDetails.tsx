import { ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { extractId } from '../../../services';
import { useDispatch } from '../../../store/hooks';
import fetchArtistDetails from '../../../store/slices/artist/fetchArtistDetails';
import { WebPlaybackTrack } from '../context/types'
import { AnyObj, Artists } from '../context/types';
import ItemDetail from './ItemDetail';

interface Props {
  track?: WebPlaybackTrack;
}

export default function ItemDetails({track}: Props): ReactElement {
  const navigate = useNavigate();

  const openArtistDetails = (uri:string) => {
    navigate(`artist/${extractId(uri)}`);
  }
  useEffect(() => {
    if (!track) return;

    const wrapper = document.querySelector('#item-details-container');
    if (!wrapper) return;

    const {left, right} = wrapper?.getBoundingClientRect();
    const width = right - left;
    const pTrack = document.querySelector("#track-item-details-container");
    const pTrackRect = pTrack?.getBoundingClientRect();
    const pArtist = document.querySelector("#artist-item-details-container");
    const pArtistRect = pArtist?.getBoundingClientRect();

    if (!pTrackRect) return;
    if (!pArtistRect) return;

    const pTrackWidth = pTrackRect.right - pTrackRect.left;
    const pArtistWidth = pArtistRect.right - pArtistRect.left;

    conditionallyAddAnimation(width, [{node: pTrack, width: pTrackWidth}, {node: pArtist, width: pArtistWidth}]);
  }, [track])

  const conditionallyAddAnimation = (width: number, elementsToAddTo: Array<AnyObj>) => {

    const filtered = elementsToAddTo.filter((element) => element.width > width);

    filtered.forEach((element) => {
      addAnimationToElement(element.node)
    })
  }

  // TODO: fix this, should only add classes to element parent instead of both elements parents
  const addAnimationToElement = (element: AnyObj) => {
    element.parentNode.parentNode.classList.add('hover:animate-none', 'animate-scroll-text-linear');
  }

  return (
    <div id="item-details-container" className="h-full text-left flex flex-col p-1 justify-center ml-[6px] overflow-hidden">
      <ItemDetail className="text-small text-white">
        <a id="track-item-details-container" className="text-small text-white min-w-fit">
          {track?.name ?? ''}
        </a>
      </ItemDetail>
      <ItemDetail id="artist-item-details-container" className="text-[11px] text-spotify-gray-300">
        {
          track?.artists?.map((curr: Artists, idx: number) => {
            return <p onClick={() => openArtistDetails(curr.uri)}>{`${idx === track?.artists.length - 1 ? curr.name : curr.name + ', '}`}</p>;
          })
        }
      </ItemDetail>
    </div>
  )
}
