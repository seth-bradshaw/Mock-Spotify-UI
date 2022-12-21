import React, { PropsWithChildren, ReactElement } from 'react'

interface Props {
  clickHandler: any;
  className?: string;
}

export default function BaseControl({ children, clickHandler, className = '' }: PropsWithChildren<Props>): ReactElement {
  return (
    <button className={`rounded-full bg-transparent h-9 w-9 transition-all ease-in-out duration-300 hover:scale-110 flex justify-center items-center ${className}`} onClick={clickHandler}>
      {children}
    </button>
  )
}
