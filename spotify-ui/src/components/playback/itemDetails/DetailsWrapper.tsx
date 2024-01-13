import { ReactElement, useEffect, useState } from 'react'
import {equals, isNil} from 'ramda'
import ItemDetails from './ItemDetails'
import ItemImageContainer from './ItemImageContainer'
import { usePlaybackContext } from '../context'
import { PlayerState, WebPlaybackTrack } from '../context/types';
import { playerEventHandler } from '../sdk';

interface Props {}

export default function DetailsWrapper({}: Props): ReactElement {
  const { player } = usePlaybackContext();
  const [track, setTrack] = useState<WebPlaybackTrack>();
  const maybeUpdateState = (state: PlayerState) => {
    const current_track = state.track_window.current_track;
    if (!isNil(current_track) && !equals(current_track, track)) {
      setTrack(current_track);
    }
  }
  useEffect(() => {
    if (!player) {
      return;
    }

    playerEventHandler(player, "player_state_changed", 'update-track', maybeUpdateState)
  }, [player, track])

  return (
    <div className="basis-1/3 min-w-[225px] flex items-center justify-start">
      <ItemImageContainer track={track}/>
      <ItemDetails track={track} />
      {
        !isNil(track?.uri) && (
          <div className="p-1 items-center justify-start">
            <i className="fa-regular fa-heart p-1 shadow-inner-md z-20"></i>
          </div>
        )
      }
    </div>
  )
}
