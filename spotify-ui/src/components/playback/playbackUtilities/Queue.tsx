import React, { ReactElement, useState } from 'react'
import { getUserQueue } from '../../../services'
import BaseControl from '../controls/BaseControl'

interface Props {
  
}

export default function Queue({}: Props): ReactElement {
  const [color, setColor] = useState<string>('');

  const clickHandler = async () => {
    // TODO click handler navigates to queue, fetches queue prior if not already in redux state
    // needs to be able to toggle route based on windows path
    // if not on /queue
      // check to see if redux doesn't have queue
        // fetch queue
      
      // push to /queue
    // otherwise go back to previous route
    if (color.length === 0) {
      setColor('text-spotify-green-400');
    } else {
      setColor('');
    }
    // ! temp code:
    const queue = await getUserQueue();
    console.log('user queue ==>', {queue});
  }

  return (
    <BaseControl clickHandler={clickHandler} className={color}>
      <i className="fa-solid fa-layer-group fa-lg"></i>
    </BaseControl>
  )
}
