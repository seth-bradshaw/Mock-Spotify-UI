import React, { PropsWithChildren } from 'react'

type Props = {
    className?: string;
}

export default function CardRow({ children, className = '' }: PropsWithChildren<Props>) {
  return (
    <div className={`flex gap-3 h-min ${className}`}>
      {children}
    </div>
  )
}