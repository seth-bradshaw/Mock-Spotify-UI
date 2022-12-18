import React, { ReactElement } from 'react'

interface IconProps {
  isPlaying: boolean;
  className?: string;
}

const PlayIcon = ({ isPlaying, className }: IconProps): ReactElement => <i className={`fa-solid fa-${isPlaying ? 'pause pl-[3px] pr-1' : 'play pl-0.5'} text-spotify-gray-800 ${className}`}></i>;

export default PlayIcon;