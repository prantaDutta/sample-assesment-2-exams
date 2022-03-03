import { render, screen } from '@testing-library/react'
import { ShowResults } from './index'
import { HTML_QUESTIONS } from '../../util/constants'

const dummyResults = [
  {
    correct: true,
    questionId: 0,
  },
  {
    correct: false,
    questionId: 1,
  },
  {
    correct: true,
    questionId: 2,
  },
  {
    correct: true,
    questionId: 3,
  },
  {
    correct: false,
    questionId: 4,
  },
]

describe('renders the showResults', () => {
  beforeEach(() => {
    render(
      <ShowResults
        results={dummyResults}
        handleReset={() => {}}
        questions={HTML_QUESTIONS}
      />
    )
  })

  it('renders "page title"', () => {
    expect(
      screen.getByText(/Thank you completing the test. Here's Your Result:/)
    ).toBeInTheDocument()
  })

  it('should render the answer is incorrect for incorrect answers', () => {
    const { firstChild } = screen.getByRole(/Question#1/)
    expect(firstChild).toHaveTextContent('Your Answer is Incorrect')
  })

  it('should render the background as "#922724" if the answer is incorrect', () => {
    expect(screen.getByRole(/Question#1/)).toHaveStyle(
      `background-color: #922724`
    )
  })

  it('should render the answer is correct for correct answers', () => {
    const { firstChild } = screen.getByRole(/Question#3/)
    expect(firstChild).toHaveTextContent('Your Answer is Correct')
  })

  it('should render the background as "#228b22" if the answer is correct', () => {
    expect(screen.getByRole(/Question#3/)).toHaveStyle(
      `background-color: #228b22`
    )
  })
})
