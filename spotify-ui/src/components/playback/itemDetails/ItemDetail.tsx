import { PropsWithChildren } from 'react'
import { WebPlaybackTrack, AnyObj } from '../context/types'

interface Props {
    className?: string,
    id?: string,
    track?: WebPlaybackTrack,
    wrapperRef?: AnyObj,
}

export default function ItemDetail({className='', id='', children}: PropsWithChildren<Props>) {
  return (
      <div id="p-item-details-container" className={`hover:underline overflow-x-visible z-10 ${className}`} onClick={(e) => {
      }}>
        <div id={id} className="min-w-fit truncate">
          {children}
        </div>
      </div>
  )
}