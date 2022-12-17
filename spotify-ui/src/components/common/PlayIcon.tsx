import React, { ReactElement } from 'react'

interface IconProps {
  isPlaying: boolean;
  className?: string;
}

const PlayIcon = ({ isPlaying, className }: IconProps): ReactElement => <i className={`fa-solid fa-${isPlaying ? 'pause' : 'play pl-[1px]'} text-spotify-gray-800 ${className}`}></i>;

export default PlayIcon;