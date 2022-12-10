import React, {} from 'react'
import usePlaybackContext from './usePlaybackContext'




export default function PlaybackContainer({children}:any) {
    const context = usePlaybackContext()
   console.log('read', context.ready)
  return (
    <div>
        
    </div>
  )
}
