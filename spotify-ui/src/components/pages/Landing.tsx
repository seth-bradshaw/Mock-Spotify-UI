import React from 'react'
import { loginWithSpotify } from '../../services'

export default function Landing() {
  return (
    <div>
      <button onClick={loginWithSpotify}>Login</button>
    </div>
  )
}
