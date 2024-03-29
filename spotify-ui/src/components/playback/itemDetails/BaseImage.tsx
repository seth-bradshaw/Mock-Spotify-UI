import { PropsWithChildren } from 'react'

interface Props {
  imageUrl?: string,
  className?: string,
}

export default function BaseImage({imageUrl='', className='', children}: PropsWithChildren<Props>) {
  // TODO: create skeleton for empty track
  return imageUrl?.length ? (
    <div className="aspect-square flex justify-center">
      <img src={imageUrl} className={className} />
      {children}
    </div>
  ) : null
}

