import React, { PropsWithChildren } from 'react'
import StickyHeader from './StickyHeader'

interface Props {
  isLoading: boolean,
  className?: string
}

export default function ViewWrapper({ isLoading, className, children}: PropsWithChildren<Props>) {
  return !isLoading ? (
    <div className={`h-full min-h-screen w-full ${className}`}>
      {children}
    </div>
  ) : <p className="text-spotify-green-400 text-xl">Loading</p>
}