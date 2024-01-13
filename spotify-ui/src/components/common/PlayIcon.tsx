import React, { ReactElement } from 'react'

interface IconProps {
  isPlaying: boolean;
  className?: string;
}

const PlayIcon = ({ isPlaying, className }: IconProps): ReactElement => <i className={`fa-solid fa-${isPlaying ? 'pause' : 'play pl-1'} text-spotify-gray-800 fa-lg ${className}`}></i>;

export default PlayIcon;