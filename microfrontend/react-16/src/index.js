import React, { useState } from 'react'
import { render } from 'react-dom'
import 'regenerator-runtime/runtime'

const HooksComponent = () => {
  const [count, setCount] = useState(0)
  
  return (
    <div className='react-16-micro-frontend'>
      <span>Micro Frontend Using React Version {React.version}</span>
      <div><strong>Counter</strong></div>
      <div>{count}</div>
      <button onClick={() => setCount(count+1)}>Increase +1</button>
    </div>
  )
}

export default (async (uri) => {
  let ROOT = null
  
  if (__IS_DEV__) {
    ROOT = document.querySelector('#app')
  } else {
    ROOT = document.querySelector('#mf2')
  }

  try {
    ROOT && render(
      <HooksComponent />,
      ROOT
    )
  } catch (err) {
    throw new Error('missing #mf1 in dom')
  }
})()