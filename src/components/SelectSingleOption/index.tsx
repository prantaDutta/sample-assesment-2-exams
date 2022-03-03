import Box from '@mui/material/Box'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { ChangeEvent, ReactNode } from 'react'
import { IQuestion } from '../../types/question'
import { AnswerSelected } from '../MultiStepper'

interface SelectSingleOption {
  children?: ReactNode
  currentQuestion: IQuestion
  answerSelected: AnswerSelected
  onAnswerChange: (answerSelected: AnswerSelected) => void
}

export const SelectSingleOption: React.FC<SelectSingleOption> = ({
  currentQuestion,
  answerSelected,
  onAnswerChange,
}) => {
  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: number,
    answer: string
  ) => {
    onAnswerChange({
      id,
      checked: e.currentTarget.checked,
      value: answer,
    })
  }

  return (
    <FormGroup>
      {currentQuestion.answers.map((answer, index) => {
        let checked = answerSelected.id === index && answerSelected.checked
        return (
          <Box key={answer} sx={{ py: 1 }} role="SingleOption">
            <FormControlLabel
              name="answers"
              role="answers"
              value={answer}
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
