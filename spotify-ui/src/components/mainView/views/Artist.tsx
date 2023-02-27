import React, { useEffect } from 'react';
// @ts-ignore
import { isNil } from 'ramda';
import { useDispatch, useSelector } from '../../../store/hooks';
import { fetchFollowedArtists } from '../../../store/slices/artist';
import { getActiveArtist } from '../../../store/slices/artist/artist.selectors';
import useIsFollowingArtist from '../../../hooks/artist/useIsFollowingArtist';
import BaseControl from '../../playback/controls/BaseControl';
import PlayIcon from '../../common/PlayIcon';

type Props = {}

export default function Artist({}: Props) {
  const artist = useSelector(getActiveArtist);
  const dispatch = useDispatch();
  const isFollowing = useIsFollowingArtist();
  const imgSrc = artist?.images ? artist.images[0].url : 'default src'

  useEffect(() => {
    dispatch(fetchFollowedArtists({limit: 20}))
  }, [])

  return !isNil(artist) ? (
    <div className="h-full w-full">
      <div className="h-96 bg-gray-700">
        <div className="w-full bg-transparent text-white flex items-center h-full p-6 gap-10">
          
          <img className="rounded-full object-scale-down bg-center bg-no-repeat h-64 w-64" src={imgSrc}></img>
          <div className="flex flex-col justify-left">
            <h1 className="text-7xl font-bold mb-10">{artist?.name ?? ''}</h1>
            <h3 className="text-lg">{artist?.followers?.total ?? 0} followers</h3>
          </div>
        </div>
      </div>
      <div className="h-full">
        <div className="w-full p-4 flex items-center gap-6">
          <BaseControl clickHandler={() => console.log('clicked')} className="bg-spotify-green-400 h-12 w-12">
            {/* TODO update this to ui reducer state once that's set up */}
            <PlayIcon isPlaying={false} />
          </BaseControl>
          <button className='p-2 py-1 bg-transparent border border-white text-white h-min rounded-md hover'>
            {
              isFollowing ?
                'Following'
              :
                'Follow'
            }
          </button>
        </div>
      </div>
    </div>
  ) : null
}