// eslint-disable
import React from 'react'
import ScriptInjector from '../ScriptInjector'

const _Loader = ({ namespace, src, ...props }) => {
  return <ScriptInjector src={src} namespace={namespace} {...props} />
}

_Loader.displayName = 'Loader'

export default React.memo(_Loader)