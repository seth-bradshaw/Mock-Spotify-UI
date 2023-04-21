import React from 'react'
import { resumePlayer } from '../../../../services';
import PlayIcon from '../../../common/PlayIcon';
import BaseControl from '../../../playback/controls/BaseControl';
import BaseImage from '../../../playback/itemDetails/BaseImage'

type Props = {
  imgSrc: string;
  label: string;
  description: string;
  spotify_uri: string;
  handleClickPlay?: () => void;
  handleRedirect: () => void;
}

export default function CardWithDescription({ imgSrc, label, description, handleClickPlay = null, handleRedirect, spotify_uri }: Props) {
  const playAlbum = async () => {
    await resumePlayer({ context_uri: spotify_uri, uris: []})
  }

  return (
    <div className="basis-1/6 bg-spotify-gray-800 rounded-lg flex flex-col justify-start text-base p-4 pb-5 gap-4 hover:bg-spotify-gray-650 hover:cursor-pointer overflow-hidden relative group h-min min-w-[220px] xl:max-w-[260px]" onClick={handleRedirect}>
      <BaseImage imageUrl={imgSrc} className="block min-w-[64px] w-9/10 z-40 rounded-lg">
        <BaseControl clickHandler={playAlbum} className="bg-transparent block group absolute z-50 top-5 right-5">
          <PlayIcon isPlaying={false} className="button flex absolute rounded-full invisible group-hover:visible bg-spotify-green-400 h-10 w-10 items-center justify-center hover:text-white top-[5px] right-[5px] z-50" />
        </BaseControl>
      </BaseImage>
      <div className='mb-5 h-12'>
        <p className='text-white truncate'>{label}</p>
        <p className='text-spotify-gray-300'>{description}</p>
      </div>
    </div>
  )
}