import React from 'react'
import useSearchContext from './useSearchContext'
import SearchResults from './SearchResults';

type Props = {}

export default function Results({}: Props) {
  return (
    <div className="relative h-full w-full">
      <SearchResults />
    </div>
  )
}