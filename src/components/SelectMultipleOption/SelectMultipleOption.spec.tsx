import { render, screen } from '@testing-library/react'
import { SelectMultipleOption } from './index'
import { IQuestion } from '../../types/question'

const dummyQuestion: IQuestion = {
  id: 1,
  question: 'Which of the following elements are block level elements?',
  answers: ['<div>', '<span>', '<ul>', '<button>'],
  selectMultiple: true,
  correctAnswer: ['<div>', '<ul>'],
}

describe('renders "selectSingleOption"', () => {
  const answerSelected = {
    id: [1],
    checked: true,
    value: ['<div>'],
  }
  beforeEach(() => {
    render(
      <SelectMultipleOption
        currentQuestion={dummyQuestion}
        answerSelected={answerSelected}
        onAnswerChange={() => {}}
      />
    )
  })

  it('should control the checked element with checked value and id', () => {
    const element = screen.getAllByRole(/Checkbox/) as any
    element.forEach((el: any, i: number) => {
      if (i === 0) {
        expect(el.children[0].checked).toBeTruthy()
      } else {
        expect(el.children[0].checked).toBeFalsy()
      }
    })
  })

  it('should render all the answers', () => {
    const element = screen.getAllByRole('answers') as any
    element.forEach((el: any, i: any) => {
      expect(el.children[0].children[0].value).toBe(dummyQuestion.answers[i])
    })
  })
})
