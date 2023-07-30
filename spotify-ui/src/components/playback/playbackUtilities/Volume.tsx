import { FormEvent, ReactElement, useEffect, useState } from "react";
import BaseSlider from "../../common/BaseSlider";
import { usePlaybackContext } from "../context";
import VolumeIcon from "./VolumeIcon";

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
    player.setVolume(volume_percent / 100).then(() => {
      console.log('volume updated')
    })
  };

  const toggleMute = () => {
    // * spotify web API or SDK don't support mute, so we need to manually do it
    if (volume === 0) {
      player.setVolume(prevVolume / 100).then(() => {
        console.log('volume updated')
      })
      setVolume(prevVolume)
      setPrevVolume(0)
    } else {
      player.setVolume(0).then(() => {
        console.log('volume updated')
      })
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
