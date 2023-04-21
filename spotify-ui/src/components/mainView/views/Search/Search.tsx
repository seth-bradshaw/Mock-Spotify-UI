import React from 'react'
import { useParams } from 'react-router'
import SearchContextProvider, { SearchContext } from './SearchContext'
import ViewWrapper from '../ViewLayout/ViewWrapper'
import Browse from './Browse'
import Results from './Results'

type Props = {}

export default function Search({}: Props) {
  return (
    <SearchContextProvider>
      <ViewWrapper isLoading={false}>
        <Browse />
        <Results />
      </ViewWrapper>
    </SearchContextProvider>
  )
}