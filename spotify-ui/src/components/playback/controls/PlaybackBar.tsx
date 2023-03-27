import React, { FormEvent, useEffect, useState } from 'react'
import BaseSlider from '../../common/BaseSlider'
import { usePlaybackContext } from '../context'
import { PlayerState } from '../context/types'
import { playerEventHandler } from '../sdk'
import PositionInterval from './PositionInterval'
import TimeLabel from './TimeLabel'

type Props = {}

export const msToMinutesAndSeconds = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds;
}

const Interval = new PositionInterval();

export default function PlaybackBar({}: Props) {
    const [duration, setDuration] = useState<number>(0);
    const [position, setPosition] = useState<number>(0);
    const { player } = usePlaybackContext();

    const handleChange = (pos: number) => {
        setPosition(pos)
    }

    const maybeSyncBar = (state: PlayerState) => {
        if (duration !== state.duration) {
            setDuration(state.duration);
        }

        if (position !== state.position) {
            setPosition(state.position);
        }

        if (!state.paused) {
            Interval.startIntervalAt(state.position, state.duration,  handleChange)
        } else {
            Interval.removeInterval();
        }
    }

    const seekToPosition = (e: FormEvent) => {
        const seekPosition = Number((e.target as HTMLInputElement).value);
        if (!player || seekPosition === position) {
            return;
        }
        
        // * remove existing position interval
        Interval.removeInterval();

        // * seek to new position, this triggers the 'player_state_changed' event, 
        // * so maybeSyncBar will handle creating new position interval
        player.seek(seekPosition).then(() => console.log('seeked to ', {seekPosition}))
    }

    useEffect(() => {
        if (!player) {
            return;
        }

        playerEventHandler(player, 'player_state_changed', 'playback-bar', maybeSyncBar)
    }, [player]);

  return (
    <div className='w-full flex gap-2 items-center text-sm'>
        <TimeLabel className="text-right" label={msToMinutesAndSeconds(position)} />
        <BaseSlider id="playback-bar" defaultValue={0} className="w-full" value={position} max={duration.toString()} handleChange={seekToPosition}/>
        <TimeLabel className="text-left" label={msToMinutesAndSeconds(duration)} />
    </div>
  )
}