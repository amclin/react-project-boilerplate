// eslint-disable
import React, {useEffect, Fragment} from 'react'

const _Renderer = ({ render, ...props }) => {
  useEffect(() => {
    render(props)
  }, [])
  return <Fragment />
}

_Renderer.displayName = 'Loader'

export default React.memo(_Renderer)