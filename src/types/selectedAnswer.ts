export interface SingleSelectedAnswer {
  id: null | number
  value: string
  checked: boolean
}

export interface MultipleSelectedAnswer {
  id: number[]
  value: string[]
  checked: boolean
}

export type SelectedAnswer = MultipleSelectedAnswer | SingleSelectedAnswer
