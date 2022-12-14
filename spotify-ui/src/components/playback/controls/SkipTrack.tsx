import React, { ReactElement } from 'react'

interface Props {
  className?: string;
}

export default function SkipTrack({ className }: Props): ReactElement {
  return (
    <div className={className}>
      &gt;&gt;
    </div>
  )
}
