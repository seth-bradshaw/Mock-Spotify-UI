import React, { useEffect, useState } from 'react'
import BaseSlider from '../../common/BaseSlider'
import { usePlaybackContext } from '../context'
import { PlayerState } from '../context/types'
import { playerEventHandler } from '../sdk'
import PositionInterval from './PositionInterval'
import TimeLabel from './TimeLabel'

type Props = {}

const msToMinutesAndSeconds = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds;
}

const Interval = new PositionInterval();

export default function PlaybackBar({}: Props) {
    const [duration, setDuration] = useState<number>(0);
    const [position, setPosition] = useState<number>(0);
    const { player } = usePlaybackContext();

    const handleChange = (pos: number, dur: number) => {
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

    useEffect(() => {
        if (!player) {
            return;
        }

        playerEventHandler(player, 'player_state_changed', 'playback-bar', maybeSyncBar)
    }, [player]);

  return (
    <div className='w-full flex gap-2 items-center text-sm'>
        <TimeLabel className="align-right" label={msToMinutesAndSeconds(position)} htmlFor='playback-bar' />
        <BaseSlider id="playback-bar" defaultValue={0} className="w-full" value={position} max={duration.toString()} handleChange={(e) => console.log((e.target as HTMLInputElement).value)}/>
        <TimeLabel className="align-left" label={msToMinutesAndSeconds(duration)} />
    </div>
  )
}