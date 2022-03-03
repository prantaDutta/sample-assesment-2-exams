import React, { ReactNode, useState } from 'react'
import { Box } from '@mui/material'
import { MultiStepper } from '../../components/MultiStepper'
import { IResult } from '../../types/result'
import { useLocation } from 'react-router-dom'
import { HTML_QUESTIONS, JAVASCRIPT_QUESTIONS } from '../../util/constants'

interface ExamProps {
  children?: ReactNode
}

export const Exam: React.FC<ExamProps> = () => {
  const { state }: any = useLocation()
  if (!state.language) {
    return <p>Something Went Wrong!</p>
  }
  const questions =
    state.language === 'html' ? HTML_QUESTIONS : JAVASCRIPT_QUESTIONS

  const [results, setResults] = useState<IResult[]>([])
  const handleResults = (newResults: IResult[]) => {
    setResults([...newResults])
  }

  return (
    <Box>
      <MultiStepper
        questions={questions}
        results={results}
        handleResults={handleResults}
      />
    </Box>
  )
}
