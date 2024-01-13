import { ReactElement, useEffect, useRef } from 'react'
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
  const wrapperRef = useRef(null);
  const artistsRef = useRef(null);
  const tracksRef = useRef(null);

  const openArtistDetails = (uri:string) => {
    navigate(`artist/${extractId(uri)}`);
  }

  useEffect(() => {
    if (!track || !wrapperRef) return;

    const { left, right } = wrapperRef.current.getBoundingClientRect();
    const width = right - left;

    if (tracksRef.current && tracksRef.current.scrollWidth > width) {
      tracksRef.current.classList.add('hover:animate-none', 'animate-scroll-text-linear');
    } else {
      tracksRef.current?.classList.remove('hover:animate-none', 'animate-scroll-text-linear');
    }

    if (artistsRef.current && artistsRef.current.scrollWidth > width) {
      artistsRef.current.classList.add('hover:animate-none', 'animate-scroll-text-linear');
    } else {
      artistsRef.current?.classList.remove('hover:animate-none', 'animate-scroll-text-linear');
    } 
  }, [track])

  return (
    <div ref={wrapperRef} className="h-full text-left flex flex-col p-1 justify-center ml-[6px] overflow-hidden max-w-[450px]">
      <ItemDetail itemRef={tracksRef} className="text-small text-white">
        <a className="text-small text-white min-w-fit hover:underline">
          {track?.name ?? ''}
        </a>
      </ItemDetail>
      <ItemDetail itemRef={artistsRef} className="text-[13px] text-spotify-gray-300">
        <div>
          {
            track?.artists?.map((curr: Artists, idx: number) => {
              return (
                <>
                  <a onClick={() => openArtistDetails(curr.uri)} className="hover:underline">{curr.name}</a>
                  {idx === track?.artists.length - 1 ? '': ', '}
                </>
              )
            })
          }
        </div>
      </ItemDetail>
    </div>
  )
}
