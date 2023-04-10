import React, { PropsWithChildren } from 'react'
import StickyHeader from './StickyHeader'

interface Props {
  isLoading: boolean
}

export default function ViewWrapper({ isLoading, children}: PropsWithChildren<Props>) {
  return !isLoading ? (
    <div className="h-full w-full">
      {children}
    </div>
  ) : <p className="text-spotify-green-400 text-xl">Loading</p>
}