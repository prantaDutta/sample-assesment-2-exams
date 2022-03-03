import { useLocation } from 'react-router-dom'
import { screen } from '@testing-library/react'
import React from 'react'
import { Exam } from './index'

jest.mock('react-router-dom')

it('should render something went wrong if state does not have a value', () => {
  // @ts-ignore
  useLocation.mockReturnValue({
    state: {
      language: null,
    },
  })

  // @ts-ignore
  renderWithRouter(<Exam />)
  expect(screen.getByText(/Something Went Wrong!/i)).toBeInTheDocument()
})

it('should not render something went wrong if the language is defined', () => {
  // @ts-ignore
  useLocation.mockReturnValue({
    state: {
      language: 'html',
    },
  })

  // @ts-ignore
  renderWithRouter(<Exam />)
  expect(screen.queryByText(/Something Went Wrong!/i)).toBeNull()
})
