import React from 'react'
import { render, screen } from '@testing-library/react'
import { Home } from './index'
import userEvent from '@testing-library/user-event'

describe('should render "Home"', () => {
  beforeEach(() => {
    // @ts-ignore
    renderWithRouter(<Home />)
  })

  it('only render errors if errors are there', async () => {
    expect(screen.queryByText('Please Fill the forms first')).toBeNull()
    const button = await screen.findByRole('button', { name: 'Submit' })
    await userEvent.click(button)
    expect(
      screen.queryByText('Please Fill the forms first')
    ).toBeInTheDocument()
  })

  it('should input field should work fine', () => {
    const nameInput = screen.getByRole('NameInput').children[0] as any
    userEvent.type(nameInput, 'Pranta Dutta')
    expect(nameInput).toHaveValue('Pranta Dutta')
  })
})
