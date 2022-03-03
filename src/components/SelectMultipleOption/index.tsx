import Box from '@mui/material/Box'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { ChangeEvent, ReactNode, useEffect } from 'react'
import { IQuestion } from '../../types/question'
import { AnswerSelected } from '../MultiStepper'

interface SelectMultipleOptionProps {
  children?: ReactNode
  currentQuestion: IQuestion
  answerSelected: AnswerSelected
  onAnswerChange: (answerSelected: AnswerSelected) => void
}

export const SelectMultipleOption: React.FC<SelectMultipleOptionProps> = ({
  currentQuestion,
  answerSelected,
  onAnswerChange,
}) => {
  const answerSelectedId = answerSelected.id as number[]
  const answerSelectedValue = answerSelected.value as string[]
  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: number,
    answer: string
  ) => {
    let newId: number[] = []
    let newValue: string[] = []

    if (e.currentTarget.checked) {
      if (
        answerSelected &&
        !answerSelectedId.includes(id) &&
        answerSelectedValue.length > 0 &&
        !answerSelectedValue.includes(answer)
      ) {
        // @ts-ignore
        newId = [...answerSelectedId, id]
        newValue = [...answerSelectedValue, answer]
      } else {
        newId = [id]
        newValue = [answer]
      }
    } else {
      newId = answerSelectedId.filter((answerId) => answerId !== id)
      newValue = answerSelectedValue.filter((value) => value !== answer)
    }

    onAnswerChange({
      id: newId,
      checked: e.currentTarget.checked,
      value: newValue,
    })
  }

  useEffect(() => {
    onAnswerChange({
      id: [],
      checked: false,
      value: [],
    })
  }, [])

  return (
    <FormGroup>
      {currentQuestion.answers.map((answer, index) => {
        let checked = answerSelectedValue.includes(answer)
        return (
          <Box key={answer} sx={{ py: 1 }}>
            <FormControlLabel
              name="answers"
              value={answer}
              role="answers"
              control={
                <Checkbox
                  role={'Checkbox'}
                  checked={checked}
                  onChange={(e) => handleCheckboxChange(e, index, answer)}
                />
              }
              label={answer}
            />
          </Box>
        )
      })}
    </FormGroup>
  )
}
