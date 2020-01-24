// eslint-disable
import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    const { renderOnError, children } = this.props

    if (this.state.hasError) {
      return typeof renderOnError === 'function' ? (
        renderOnError()
      ) : (
        <h1>Something went wrong</h1>
      )
    }

    return children
  }
}
