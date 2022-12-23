import React, { useEffect, useState, useRef, PropsWithChildren } from 'react'
// @ts-ignore
import { isEmpty } from 'rambda';
import { WebPlaybackTrack, AnyObj } from '../context/types'
import { Artists } from '../context/types';

interface Props {
    className?: string,
    id?: string,
    track?: WebPlaybackTrack,
    wrapperRef?: AnyObj,
}

export default function ItemDetail({className='', id='', track, children}: PropsWithChildren<Props>) {
  useEffect(() => {
    console.log('useEffect called in ItemDetail')

  }, [track])

  // const handleMouseOverEventHandler = (event: MouseEvent) => {
  //  onsole.log('handleMouseOverEventHandler', event);
  // }

  return (
      <div id="p-item-details-container" className={`hover:underline overflow-x-visible z-10 ${className}`} onClick={(e) => {
      }}>
        <div id={id} className="min-w-fit truncate">
          {children}
        </div>
      </div>
  )
}