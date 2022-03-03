import { IResult } from '../types/result'

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function arraysEqual(a: any[], b: any[]) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export function addOrReplace(arr: IResult[], newObj: IResult) {
  return [
    ...arr.filter((obj) => obj.questionId !== newObj.questionId),
    { ...newObj },
  ]
}

export function getCorrectPercentage(results: IResult[]) {
  const filtered = results.filter((res) => res.correct)
  return (filtered.length * 100) / results.length
}

export function getIncorrectPercentage(results: IResult[]) {
  const filtered = results.filter((res) => !res.correct)
  return (filtered.length * 100) / results.length
}

export function isCorrect(results: IResult[], id: number) {
  let isCorrect = false
  results.forEach((result) => {
    if (result.questionId === id) {
      if (result.correct) {
        isCorrect = true
      }
    }
  })
  return isCorrect
}
