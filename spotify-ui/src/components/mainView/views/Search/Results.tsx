import React from 'react'
import useSearchContext from './useSearchContext'
import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';

type Props = {}

export default function Results({}: Props) {
  return (
    <div className="relative h-full w-full">
      <SearchHeader />
      <SearchResults />
    </div>
  )
}