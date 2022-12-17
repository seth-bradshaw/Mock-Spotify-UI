import React, { FormEvent, ReactElement, useEffect, useState } from 'react'
import { clearInterval } from 'timers';
import { changeVolume } from '../../../services';
import BaseSlider from '../../common/BaseSlider'
import { usePlaybackContext } from '../context'
import VolumeIcon from './VolumeIcon'

interface Props {
  
}
// TODO polish this. Needs to fetch right away if released quickly
let timeout: null | NodeJS.Timeout = null;
const buffer: Array<number> = [];
function initializeGentleVolume () {
  return (vol: number) => {
    buffer.push(vol)
    console.log('timeout', { timeout})
    if (timeout !== null) {
      console.log('clearing timeout')
      clearTimeout(timeout)
    }
    if (timeout && buffer.length >= 10) {
      console.log('calling service, stopping timeouts')
        changeVolume({volume_percent: buffer.pop() ?? vol });
        buffer.splice(0, buffer.length)
        timeout = null;
    } else {
      timeout = setTimeout(() => {
        console.log('calling timeout', buffer)
        changeVolume({volume_percent: buffer.pop() ?? vol });
        buffer.splice(0, buffer.length)
        timeout = null;
      }, 500)
    }
  }
}

// class BufferVolume
// time
// stack
// initBuffer
// 
//
// clearBuffer


export default function Volume({}: Props): ReactElement {
  const [volume, setVolume] = useState<number>(50);
  const { player } = usePlaybackContext();
  const bufferVolumeUpdate = initializeGentleVolume();

  useEffect(() => {
    if (!player) {
      return;
    }
    player.getVolume().then((vol: number) => {
      setVolume(vol * 100);
    });
  }, [player])

  const updateVolume = (e:FormEvent) => {
    const volume_percent = +(e.target as HTMLInputElement).value;
    setVolume(volume_percent);
    bufferVolumeUpdate(volume_percent)
  }

  return (
    <div className="flex gap-3 items-center">
      <VolumeIcon volume={volume} />
      <BaseSlider defaultValue={volume} id={'volume-slider'} handleChange={updateVolume}/>
    </div>
  )
}
