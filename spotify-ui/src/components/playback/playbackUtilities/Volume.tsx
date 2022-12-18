import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import BufferVolumeService from "./BufferVolumeService";
import BaseSlider from "../../common/BaseSlider";
import { usePlaybackContext } from "../context";
import VolumeIcon from "./VolumeIcon";

const BufferVolumeChange = new BufferVolumeService();

interface Props {}

export default function Volume({}: Props): ReactElement {
  const [volume, setVolume] = useState<number>(50);
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

  const muteVolume = () => {
    // * spotify web API or SDK don't support mute, so we need to manually do it
    BufferVolumeChange.callUpdateVolume(0);
    setVolume(0);

    const slider = document.querySelector("#volume-slider") as HTMLInputElement;
    slider.style.background = `linear-gradient(to right, #A7A7A7 0%, #A7A7A7 100%)`;
    slider.value = "0";
  };

  return (
    <div className="flex gap-2 items-center">
      <VolumeIcon volume={volume} muteVolume={muteVolume} />
      <BaseSlider
        defaultValue={volume}
        id={"volume-slider"}
        handleChange={updateVolume}
      />
    </div>
  );
}
