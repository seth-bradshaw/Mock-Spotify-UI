import React, { useState, ReactElement, useEffect, useCallback } from 'react'
import { pausePlayer, resumePlayer } from '../../../services';
import { usePlaybackContext } from '../context';
import { AnyObj, PlayerState } from '../context/types';
import BaseControl from './BaseControl'
import playerEventHandler from '../sdk/playerEventHandler';

interface Props {
  
}

export default function TogglePlay({}: Props): ReactElement {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [track, setTrack] = useState<string>('');

  const { player } = usePlaybackContext();

  // ? Dispatch redux slice here instead so we don't need track in state?
  const handleClick = async ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken },
    },
  }: AnyObj) => {
    getOAuthToken(() => isPlaying ? pausePlayer() : resumePlayer({ body: { tracks: [spotify_uri]} }));
  }
  
  const maybeUpdateState = (state: PlayerState) => {
    if (track !== state.track_window.current_track?.uri) {
      setTrack(state.track_window.current_track.uri)
    }
    
    if (isPlaying !== !state.paused) {
      setIsPlaying(!state.paused);
    }
  }

  useEffect(() => {
    playerEventHandler(player, "player_state_changed", 'toggle-play', maybeUpdateState);
  }, [player, track, isPlaying])

  return (
    <BaseControl>
      <button onClick={() => handleClick({ playerInstance: player, spotify_uri: track})}>{isPlaying ? 'Pause' : 'Play'}</button>
    </BaseControl>
  )
}
