import React, {PropsWithChildren} from 'react'

interface Props {
  imageUrl?: string,
  className?: string,
}

export default function BaseImage({imageUrl, className='', children}: PropsWithChildren<Props>) {
  return (
    <div className="">
      <img src={imageUrl} className={className} />
      {children}
    </div>
  )
}

