import React, { PropsWithChildren, ReactElement } from 'react'

interface Props {
  
}

export default function BaseControl({ children }: PropsWithChildren): ReactElement {
  return (
    <div>
      {children}
    </div>
  )
}
