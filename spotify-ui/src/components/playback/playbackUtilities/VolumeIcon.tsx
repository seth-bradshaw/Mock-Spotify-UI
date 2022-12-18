import React from "react";

type Props = {
  volume: number;
  muteVolume: () => void;
};

const getVolumeType = (volume: number) => {
  if (volume > 75) {
    return "high";
  } else if (volume > 0) {
    return "low";
  } else {
    return "off";
  }
};

export default function VolumeIcon({ volume, muteVolume }: Props) {
  return (
    <button className="flex justify-start w-7 transition-all ease-in-out duration-300 hover:scale-110" onClick={muteVolume}>
      <i className={`fa-solid fa-volume-${getVolumeType(volume)} fa-lg`}></i>
    </button>
  );
}
