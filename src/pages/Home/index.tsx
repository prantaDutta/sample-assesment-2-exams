import {
  Alert,
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
} from '@mui/material'
import { FormEvent, useState } from 'react'
import SelectField from '../../components/SelectField'
import { useNavigate } from 'react-router-dom'

type Gender = 'male' | 'female' | ''
type Language = 'html' | 'javascript' | ''

interface FormValues {
  name: string
  language: Language
  gender: Gender
}

export const Home = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    gender: '',
    language: '',
  })
  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const { gender, name, language } = formValues
    if (gender && name && language) {
      console.log('formValues: ', formValues)
      navigate('/exam', {
        state: {
          language: formValues.language,
        },
      })
      setError(false)
    } else {
      setError(true)
    }
  }
  const [error, setError] = useState(false)
  return (
    <Box>
      <Typography sx={{ fontSize: '40px', fontWeight: 700 }}>Exams</Typography>
      {error && (
        <Alert sx={{ my: 2 }} severity="error">
          Please Fill the forms first
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControl sx={{ my: 2 }}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              sx={{ px: 2 }}
              role="NameInput"
              id="name"
              value={formValues.name}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  name: e.target.value,
                })
              }
            />
          </FormControl>

          <SelectField
            label={'language'}
            value={formValues.language}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                language: e.target.value as Language,
              })
            }
            options={['html', 'javascript']}
          />

          <SelectField
            label={'gender'}
            value={formValues.gender}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                gender: e.target.value as Gender,
              })
            }
            options={['male', 'female']}
          />

          <Button
            aria-label="Submit"
            type="submit"
            sx={{ mt: 5 }}
            variant="contained"
            color="success"
          >
            Submit
          </Button>
        </FormGroup>
      </form>
    </Box>
  )
}
