import React, { ReactElement } from 'react'

interface Props {
  className?: string;
}

export default function SkipTrack({ className }: Props): ReactElement {
  return (<i className={`fa-solid fa-forward text-spotify-gray-300 fa-xl ${className}`}></i>);
}
