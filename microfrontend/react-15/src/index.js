import React from 'react'
import { render } from 'react-dom'
import 'regenerator-runtime/runtime'

class Sample15Component extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    console.log('componentWillMount() called')
    console.log('No warning will appear when using React version 15')
  }
  render() {
    return <div className='react-15-micro-frontend'>Micro Frontend Using React Version {React.version}</div>
  }
}

export default (async (uri) => {
  let ROOT = null
  
  if (__IS_DEV__) {
    ROOT = document.querySelector('#app')
  } else {
    ROOT = document.querySelector('#mf1')
  }

  try {
    ROOT && render(
      <Sample15Component test={'new props'}/>,
      ROOT
    )
  } catch (err) {
    throw new Error('missing #mf1 in dom')
  }
})()