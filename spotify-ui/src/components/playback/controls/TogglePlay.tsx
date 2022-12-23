import React, { useState, ReactElement, useEffect } from 'react';
// @ts-ignore
import { isNil } from 'ramda'
import { pausePlayer, resumePlayer } from '../../../services';
import { usePlaybackContext } from '../context';
import { AnyObj, PlayerState } from '../context/types';
import BaseControl from './BaseControl'
import PlayIcon from '../../common/PlayIcon';
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
    const isValidState = !isNil(state.track_window.current_track);
    
    if (isValidState && track !== state.track_window.current_track?.uri) {
      setTrack(state.track_window.current_track.uri)
    }
    
    if (isValidState && isPlaying !== !state.paused) {
      setIsPlaying(!state.paused);
    }
  }

  useEffect(() => {
    playerEventHandler(player, "player_state_changed", 'toggle-play', maybeUpdateState);
  }, [player, track, isPlaying])

  return (
    <BaseControl clickHandler={() => handleClick({ playerInstance: player, spotify_uri: track})} className="!bg-white">
      <PlayIcon isPlaying={isPlaying} />
    </BaseControl>
  )
}
