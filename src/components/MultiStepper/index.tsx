import React, { ReactNode, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { IResult } from '../../types/result'
import { SelectMultipleOption } from '../SelectMultipleOption'
import { SelectSingleOption } from '../SelectSingleOption'
import { addOrReplace, arraysEqual } from '../../util/functions'
import { Alert } from '@mui/material'
import { IQuestion } from '../../types/question'
import { ShowResults } from '../ShowResults'
import { useNavigate } from 'react-router-dom'

export interface AnswerSelected {
  id: null | number | number[]
  checked: boolean
  value: string | string[]
}

interface MultiStepperProps {
  children?: ReactNode
  handleResults: (results: IResult[]) => void
  results: IResult[]
  questions: IQuestion[]
}

export const MultiStepper: React.FC<MultiStepperProps> = ({
  handleResults,
  results,
  questions,
}) => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set<number>())

  const currentQuestion = questions[activeStep]

  // const isStepOptional = (step: number) => {
  //   return step === 1
  // }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const isLastStep = (step: number) => {
    return questions.length === step + 1
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setSkipped(newSkipped)
    setAnswerSelected({ id: null, checked: false, value: '' })

    if (currentQuestion.selectMultiple) {
      const values = answerSelected.value as string[]

      // console.log('values: ', values)
      // console.log('correctAnswer: ', currentQuestion.correctAnswer)

      if (arraysEqual(values, currentQuestion.correctAnswer)) {
        console.log('correct')
        handleSetResults(currentQuestion.id, true)
      } else {
        console.log('incorrect')
        handleSetResults(currentQuestion.id, true)
      }

      setError(true)
    } else {
      if (answerSelected.checked) {
        if (currentQuestion.correctAnswer === answerSelected.value) {
          console.log('ans. correct')
          handleSetResults(currentQuestion.id, true)
        } else {
          console.log('ans. incorrect')
          handleSetResults(currentQuestion.id, false)
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   // You probably want to guard against something like this,
    //   // it should never occur unless someone's actively trying to break something.
    //   throw new Error("You can't skip a step that isn't optional.")
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
    handleResults([])
    navigate('/')
  }

  const handleSetResults = (questionId: number, correct: boolean) => {
    const newResults = addOrReplace(results, {
      questionId,
      correct,
    })
    handleResults([...newResults])
  }

  const [answerSelected, setAnswerSelected] = useState<AnswerSelected>({
    id: null,
    checked: false,
    value: '',
  })

  const [error, setError] = useState(false)

  // this is needed to get the latest data for results
  // after the handleSetResults Function
  useEffect(() => {
    if (isLastStep(activeStep)) {
      if (results.length === questions.length) {
        setError(false)
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        console.log('All done with results: ', results)
      }
    }
  }, [results])

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert sx={{ my: 2 }} severity="error">
          Sorry, You didn't answer all the questions
        </Alert>
      )}
      <Stepper activeStep={activeStep} alternativeLabel>
        {questions.map((question, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   )
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step
              onClick={() => setActiveStep(index)}
              key={question.id}
              {...stepProps}
            >
              <StepLabel {...labelProps}>Question {index + 1}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === questions.length ? (
        <ShowResults
          questions={questions}
          results={results}
          handleReset={handleReset}
        />
      ) : (
        <>
          {/*<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>*/}

          <Box m={5} role="Questions">
            <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
              {currentQuestion.question}
            </Typography>

            {currentQuestion.selectMultiple ? (
              <SelectMultipleOption
                answerSelected={answerSelected}
                onAnswerChange={(answerSelected) =>
                  setAnswerSelected(answerSelected)
                }
                currentQuestion={currentQuestion}
              />
            ) : (
              <SelectSingleOption
                answerSelected={answerSelected}
                onAnswerChange={(answerSelected) =>
                  setAnswerSelected(answerSelected)
                }
                currentQuestion={currentQuestion}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/*{isStepOptional(activeStep) && (*/}
            <Button
              aria-label="Skip"
              color="inherit"
              onClick={handleSkip}
              sx={{ mr: 1 }}
            >
              Skip
            </Button>
            {/*)}*/}
            <Button aria-label="Next" onClick={handleNext}>
              {activeStep === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}
