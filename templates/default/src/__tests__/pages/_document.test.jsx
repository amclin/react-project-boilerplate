import React from 'react'
import * as Document from 'next/document'
import { render } from '@testing-library/react'
import MyDocument from '../../pages/_document'

jest.mock('next/document')

// eslint-disable-next-line
Document.Head.mock = jest.fn(({ children }) => <head>{children}</head>)

describe('_document', () => {
  it('runs without error', () => {
    // tests should be improved when someone can spend time discovering how
    const { asFragment } = render(<MyDocument />)

    expect(asFragment()).toMatchSnapshot()
  })
})
