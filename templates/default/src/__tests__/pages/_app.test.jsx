/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { render } from '@testing-library/react'
import App from '../../pages/_app'

jest.mock('../../utils/apollo', () => ({
  withApollo: Component => ({ ...pageProps }) => (
    <div data-testid="apollo-wrapper">
      <Component {...pageProps} />
    </div>
  )
}))

const mockComponent = () => <div data-testid="mock-component">Ok!</div>

describe('App', () => {
  it('controls the root NextJS app', () => {
    const { asFragment, getByTestId } = render(
      <App Component={mockComponent} pageProps={{}} />
    )

    expect(getByTestId('apollo-wrapper')).toBeTruthy()
    expect(getByTestId('mock-component')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })
})
