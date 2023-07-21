import React from 'react'
import useSearchContext from './useSearchContext'

type Props = {}

export default function Browse({}: Props) {
  const { results, query } = useSearchContext();

  return (!results || !query) && (
    <div>Browse</div>
  )
}