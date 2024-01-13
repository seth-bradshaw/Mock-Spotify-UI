import { PropsWithChildren, RefObject } from 'react'
import { WebPlaybackTrack, AnyObj } from '../context/types'

interface Props {
    className?: string,
    track?: WebPlaybackTrack,
    itemRef?: RefObject<HTMLDivElement>,
}

export default function ItemDetail({className='', itemRef=null, children}: PropsWithChildren<Props>) {
  return (
      <div className={`overflow-x-visible z-10 ${className}`}>
        <div className="min-w-fit truncate" ref={itemRef}>
          {children}
        </div>
      </div>
  )
}