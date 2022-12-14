import { stat } from 'fs';
import React, { useState, ReactElement, useEffect, useCallback } from 'react'
import { resumePlayer } from '../../../services';
import { usePlaybackContext } from '../context';
import { AnyObj, PlayerState, WebPlaybackTrack } from '../context/types';
import BaseControl from './BaseControl'

interface Props {
  
}

export default function TogglePlay({}: Props): ReactElement {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { player } = usePlaybackContext();
  const [track, setTrack] = useState<string>('');
  const handleClick = async ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken },
    },
  }: AnyObj) => {
    // ? Dispatch redux slice here instead so we don't need track in state?
    getOAuthToken(() => resumePlayer({ body: { tracks: [spotify_uri]} }));
  }
  console.log('rendering TOGGLE_PLAY', { track })
  useEffect(() => {
    if (!player) {
      return;
    }
    player.addListener("player_state_changed", maybeUpdateState);
  }, [player])
  const getTrack = () => {
    console.log('getTrack', { track })
    return track;
  }
  const getIsPlaying = () => {
    console.log('getplaying', { isPlaying })
    return isPlaying;
  }
  
  const maybeUpdateState = (state: PlayerState) => {
    if (getTrack() !== state.track_window.current_track.uri) {
      console.log('toggle play state updated track', { track, stateTrack: state.track_window.current_track.uri})
      setTrack(state.track_window.current_track.uri)
    }

    if (getIsPlaying() !== !state.paused) {
      console.log('toggle play state paused state changed')
      setIsPlaying(!state.paused);
    }
  }

  return (
    <BaseControl>
      <button onClick={() => handleClick({ playerInstance: player, spotify_uri: track})}>{isPlaying ? 'Pause' : 'Play'}</button>
    </BaseControl>
  )
}
