import React, { ReactElement, useEffect, useState } from 'react'
// @ts-ignore
import {equals} from 'ramda'
import ItemDetails from './ItemDetails'
import ItemImageContainer from './ItemImageContainer'
import { usePlaybackContext } from '../context'
import { AnyObj, PlayerState, TrackWindow, WebPlaybackTrack } from '../context/types';
import { playerEventHandler } from '../sdk';

// REMOVE!!
import mockData from './mockData';

interface Props {}

// TODO: 
// enum TestEnum {
//   Property = 'property'
// }

export default function DetailsWrapper({}: Props): ReactElement {
  const { player } = usePlaybackContext();
  const [track, setTrack] = useState<WebPlaybackTrack>();
  // TODO: maybeUpdateState
    // check if out of sync and reset state if
    // passed to playerEventHandler
    // state is PlayerState type (looking to TrackWindow type)
  const maybeUpdateState = (state: AnyObj) => {
      const current_track = state.track_window.current_track;
      
      if (!equals(current_track, track)) {
        setTrack(current_track);
      }
    }

  // TODO: useEffect
    // if (not player) 
      // return 
    // playerEventHandler(player, "event name on player", subscriptionId[name of component], maybeUpdateState])
    useEffect(() => {
      if (!player) {
        return;
      }

      // playerEventHandler(player, "player_state_changed", 'update-track', maybeUpdateState)
      maybeUpdateState(mockData);
    }, [player])

  return (
    <div className="basis-1/3 min-w-[225px] flex items-center justify-start">
      <ItemImageContainer track={track}/>
      <ItemDetails track={track} />
      {/* // TODO: come back to this after text overflow handling */}
      <div className="p-1 items-center justify-start">
        <i className="fa-regular fa-heart p-1 shadow-inner-md z-20"></i>
      </div>
    </div>
  )
}
