import { render, screen } from '@testing-library/react'
import SelectField from './index'
import { SelectChangeEvent } from '@mui/material'

describe('renders SelectField component', () => {
  let gender = ''
  const onChange = (e: SelectChangeEvent) => {
    gender = e.target.value
  }
  let container: any

  beforeEach(() => {
    container = render(
      <SelectField
        label={'Enter Gender'}
        value={gender}
        onChange={onChange}
        options={['', 'male', 'female']}
      />
    )
  })

  it('should render label with passed prop', () => {
    expect(screen.getByRole('InputLabel')).toHaveTextContent('Enter Gender')
  })
})
