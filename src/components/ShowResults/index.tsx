import React, { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import { PieChart } from 'react-minimal-pie-chart'
import {
  getCorrectPercentage,
  getIncorrectPercentage,
  isCorrect,
} from '../../util/functions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { IResult } from '../../types/result'
import { IQuestion } from '../../types/question'

interface ShowResultsProps {
  children?: ReactNode
  results: IResult[]
  handleReset: () => void
  questions: IQuestion[]
}

export const ShowResults: React.FC<ShowResultsProps> = ({
  results,
  handleReset,
  questions,
}) => {
  return (
    <Box m={5}>
      <Typography sx={{ mt: 2, mb: 1, fontSize: '20px', fontWeight: 600 }}>
        Thank you completing the test. Here's Your Result:
      </Typography>
      {questions.map((question) => {
        const correct = isCorrect(results, question.id)
        return (
          <Box
            role={`Question#${question.id}`}
            key={question.id}
            sx={{
              background: correct ? '#228b22' : '#922724',
              my: 2,
              color: 'white',
              p: 2,
              borderRadius: '10px',
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '20px' }}>
              Your Answer is {correct ? 'Correct' : 'Incorrect'}
            </Typography>
            <Typography
              component="p"
              sx={{ fontSize: '20px', fontWeight: 700, my: 1 }}
            >
              Question #{question.id + 1} {question.question}
            </Typography>
            {question.answers.map((ans) => {
              return (
                <Typography key={ans} component="p" sx={{ ml: 2, my: 1 }}>
                  {ans}
                </Typography>
              )
            })}
            <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
              Correct Ans.
            </Typography>
            {question.selectMultiple ? (
              question.correctAnswer.map((ans) => {
                return (
                  <Typography component="p" key={ans} sx={{ ml: 2, my: 1 }}>
                    {ans}
                  </Typography>
                )
              })
            ) : (
              <Typography sx={{ ml: 2, my: 1 }} component="p">
                {question.correctAnswer}
              </Typography>
            )}
          </Box>
        )
      })}
      <PieChart
        style={{ height: '300px' }}
        radius={40}
        segmentsShift={0.5}
        label={({ dataEntry }) =>
          `${dataEntry.title + ' ' + Math.round(dataEntry.percentage)} %`
        }
        labelStyle={{
          fontSize: '5px',
          fontFamily: 'sans-serif',
        }}
        data={[
          {
            title: 'Correct',
            value: getCorrectPercentage(results),
            color: '#E38627',
          },
          {
            title: 'Incorrect',
            value: getIncorrectPercentage(results),
            color: '#C13C37',
          },
        ]}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleReset}>Reset</Button>
      </Box>
    </Box>
  )
}
