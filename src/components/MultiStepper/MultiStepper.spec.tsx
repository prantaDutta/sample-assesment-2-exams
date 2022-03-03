import { screen } from '@testing-library/react'
import { MultiStepper } from './index'
import { IResult } from '../../types/result'
import { IQuestion } from '../../types/question'
import { HTML_QUESTIONS } from '../../util/constants'
import userEvent from '@testing-library/user-event'

describe('should render "MultiStepper" component', () => {
  let results: IResult[] = []
  const questions: IQuestion[] = HTML_QUESTIONS
  const handleResults = (newResults: IResult[]) => (results = newResults)
  beforeEach(() => {
    // @ts-ignore
    renderWithRouter(
      <MultiStepper
        handleResults={handleResults}
        results={results}
        questions={questions}
      />
    )
  })

  it('should render the first question', () => {
    expect(
      screen.getByText(
        /Which of the following element is responsible for making the text bold in HTML?/
      )
    ).toBeInTheDocument()
  })

  it('should change the question if we go to the next page', () => {
    const button = screen.getByRole('button', { name: 'Skip' })
    userEvent.click(button)
    expect(
      screen.getByText(
        '<h1></h1> tag is used for inserting the largest heading in HTML'
      )
    ).toBeInTheDocument()
  })
})
