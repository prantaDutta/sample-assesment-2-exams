import React, { ReactNode } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { capitalizeFirstLetter } from '../../util/functions'

interface SelectFieldProps {
  children?: ReactNode
  label: string
  value: string
  onChange: (e: SelectChangeEvent) => void
  options: string[]
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <FormControl variant="standard" fullWidth sx={{ my: 2 }}>
      <InputLabel role="InputLabel" sx={{ px: 2 }} id={label}>
        {capitalizeFirstLetter(label)}
      </InputLabel>
      <Select
        sx={{ px: 2 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="InputField"
        onChange={onChange}
        data-testid="select"
      >
        <MenuItem data-testid="select-option" value={''}>
          Choose One...
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem data-testid="select-option" key={option} value={option}>
              {capitalizeFirstLetter(option)}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default SelectField
