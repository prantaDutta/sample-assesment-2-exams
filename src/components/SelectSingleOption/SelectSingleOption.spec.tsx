import { render, screen } from '@testing-library/react'
import { SelectSingleOption } from './index'
import { IQuestion } from '../../types/question'

const dummyQuestion: IQuestion = {
  id: 0,
  question:
    'Which of the following element is responsible for making the text bold in HTML?',
  answers: ['<pre>', '<a>', '<b>', '<br>'],
  selectMultiple: false,
  correctAnswer: '<b>',
}

describe('renders "selectSingleOption"', () => {
  const answerSelected = {
    id: 0,
    checked: true,
    value: '',
  }
  beforeEach(() => {
    render(
      <SelectSingleOption
        currentQuestion={dummyQuestion}
        answerSelected={answerSelected}
        onAnswerChange={() => {}}
      />
    )
  })

  it('should render all the answers', () => {
    const element = screen.getAllByRole('answers') as any
    element.forEach((el: any, i: any) => {
      expect(el.children[0].children[0].value).toBe(dummyQuestion.answers[i])
    })
  })

  it('should be able to control the checked element with checked value and id', () => {
    const element = screen.getAllByRole(/Checkbox/) as any
    element.forEach((el: any, i: number) => {
      if (i === 0) {
        expect(el.children[0].checked).toBeTruthy()
      } else {
        expect(el.children[0].checked).toBeFalsy()
      }
    })
  })
})
