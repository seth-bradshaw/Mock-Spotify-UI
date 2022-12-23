import { ReactElement, useEffect, useState } from 'react'
import { WebPlaybackTrack } from '../context/types'
import BaseImage from './BaseImage'

interface Props {
  track?: WebPlaybackTrack
}

export default function ItemImageContainer({track}: Props): ReactElement {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (!track) {
      return;
    }

    setImageUrl(track.album.images[1].url);
  }, [track])

  return (
    <div className="block relative min-w-[64px] z-50">
      <BaseImage imageUrl={imageUrl} className="block min-w-[64px] w-16 h-16 z-40">
        <div className="bg-transparent block group absolute z-50 top-0 h-full w-full">
          <button className="button flex absolute rounded-full invisible group-hover:visible bg-spotify-gray-800 h-6 w-6 items-center justify-center hover:text-white top-[5px] right-[5px] z-50">
            <i className="fa-solid fa-angle-up" />
          </button>
        </div>
      </BaseImage>
    </div>
  )
}
