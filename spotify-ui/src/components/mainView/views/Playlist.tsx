import React from 'react'
import { useParams } from 'react-router'

type Props = {}

export default function Playlist({}: Props) {
    const params = useParams();
  return (
    <div className="h-full mb-5 text-xl text-white">{params.playlistid ?? ''}</div>
  )
}