import React from 'react'
import useSearchContext from './useSearchContext'

type Props = {}

export default function Browse({}: Props) {
  const { results } = useSearchContext();

  return !results && (
    <div>Browse</div>
  )
}