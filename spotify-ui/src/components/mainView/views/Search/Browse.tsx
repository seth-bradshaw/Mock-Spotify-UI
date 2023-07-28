import React from 'react'
import useSearchContext from './useSearchContext'
import SearchCategories from '../Categories/SearchCategories';

type Props = {}

export default function Browse({}: Props) {
  const { results, query } = useSearchContext();

  return (!results || !query) && (
    <div className="px-6 my-20">
      <SearchCategories />
    </div>
  )
}