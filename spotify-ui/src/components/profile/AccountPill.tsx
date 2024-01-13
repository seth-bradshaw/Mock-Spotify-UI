import React from 'react'

type Props = {}

export default function AccountPill({}: Props) {
    // select profile from state

  return (
    <div onClick={() => console.log('open profile dropdown')}>
        <img></img>
        <p>name</p>
        <p>^</p>
    </div>
  )
}