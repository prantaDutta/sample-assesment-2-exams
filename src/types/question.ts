export interface ISingleAnswerQuestion {
  selectMultiple: false
  correctAnswer: string
}

export interface IMultipleAnswerQuestion {
  selectMultiple: true
  correctAnswer: string[]
}

export type IQuestion = (ISingleAnswerQuestion | IMultipleAnswerQuestion) & {
  id: number
  question: string
  answers: string[]
}
