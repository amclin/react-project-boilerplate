// eslint-disable
import React, { useEffect, useState } from 'react'
import { useScript } from '../../atoms/UseScript'
import ErrorBoundary from '../../atoms/ErrorBoundary'
import Renderer from '../Renderer'

const _ScriptInjector = ({ src, renderWhileLoading, namespace, ...props }) => {
  const [ fromComponent, setComponent ] = useState(null)
  const {component, error} = useScript(src, namespace)

  if (error) {
    throw new Error('unable to register component during script injection.')
  }

  useEffect(() => {
    if (component) {
      setComponent(component)
    }
  }, [component && component.id])

  // const whileLoading = 

  return (
    <ErrorBoundary renderOnError={() => 'couldnt load component'}>
      {fromComponent && fromComponent.id ? (
        <div id={fromComponent.id}>
          <Renderer
            render={fromComponent.render}
            id={fromComponent.id}
            {...props}
          />
        </div>
      ) : (
        <div />
      )}
    </ErrorBoundary>
  )
}

_ScriptInjector.displayName = 'ScriptInjector'

export default React.memo(_ScriptInjector)