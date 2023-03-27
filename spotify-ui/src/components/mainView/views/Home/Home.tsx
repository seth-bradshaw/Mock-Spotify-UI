import React from 'react'
import ViewWrapper from '../ViewLayout/ViewWrapper'

type Props = {}

export default function Home({}: Props) {
  return (
    <ViewWrapper isLoading={false}>
        <div className="h-full w-full">
            <div className="h-96"></div>
        </div>
    </ViewWrapper>
  )
}