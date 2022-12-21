import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import BufferVolumeService from "./BufferVolumeService";
import BaseSlider from "../../common/BaseSlider";
import { usePlaybackContext } from "../context";
import VolumeIcon from "./VolumeIcon";

const BufferVolumeChange = new BufferVolumeService();

interface Props {}

export default function Volume({}: Props): ReactElement {
  const [volume, setVolume] = useState<number>(50);
  const [prevVolume, setPrevVolume] = useState<number>(0); // * cached value after mute
  const { player } = usePlaybackContext();

  useEffect(() => {
    if (!player) {
      return;
    }

    player.getVolume().then((vol: number) => {
      setVolume(vol * 100);
    });
  }, [player]);

  const updateVolume = (e: FormEvent) => {
    const volume_percent = +(e.target as HTMLInputElement).value;
    setVolume(volume_percent);
    BufferVolumeChange.interceptEvent({ type: e.type, volume_percent });
  };

  const toggleMute = () => {
    // * spotify web API or SDK don't support mute, so we need to manually do it
    if (volume === 0) {
      BufferVolumeChange.callUpdateVolume(prevVolume);
      setVolume(prevVolume)
      setPrevVolume(0)
    } else {
      BufferVolumeChange.callUpdateVolume(0);
      setPrevVolume(volume);
      setVolume(0);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <VolumeIcon volume={volume} muteVolume={toggleMute} />
      <BaseSlider
        defaultValue={volume}
        id={"volume-slider"}
        handleChange={updateVolume}
        value={volume}
      />
    </div>
  );
}
