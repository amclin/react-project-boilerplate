// eslint-disable
import { useState, useEffect} from 'react'

let cachedScripts = []

export const useScript = (src, namespace) => {
  let script = {}
  const [state, setState] = useState({loading: true, error: false, component: null})

  useEffect(() => {
    if (cachedScripts.includes(src)) {
      setState({
        component: window[namespace].default,
        loading: false,
        error: false
      })
    } else {
      cachedScripts.push(src)

      script = document.createElement('script')
      script.src = src
      script.async = true

      const onScriptLoad = () => {
        if (window[namespace] && window[namespace].default) {
          setState({
            component: window[namespace].default,
            loading: false,
            error: false
          })
        }
      }

      const onScriptError = () => {
        const index = cachedScripts.indexOf(src)
        if (index >= 0) { cachedScripts.splice(index, 1)}

        script.remove()

        setState({
          component: null,
          loading: false,
          error: true
        })
      }

      script.addEventListener('load', onScriptLoad)
      script.addEventListener('error', onScriptError)

      document.body.appendChild(script)

      return () => {
        script.removeEventListener('load', onScriptLoad)
        script.removeEventListener('error', onScriptError)
      }
    }
  }, [src])

  return {
    component: state.component,
    error: state.error,
    loading: state.loading
  }
}