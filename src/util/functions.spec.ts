import {
  addOrReplace,
  arraysEqual,
  capitalizeFirstLetter,
  getCorrectPercentage,
  getIncorrectPercentage,
  isCorrect,
} from './functions'

it('should make "capitalize" as "Capitalize"', () => {
  expect(capitalizeFirstLetter('capitalize')).toBe('Capitalize')
})

describe('two same arrays should be equal', () => {
  it('"[1, 2, 3]" and "[1, 2, 3]" should be the same', () => {
    expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBeTruthy()
  })

  it('"[1, 2, 4]" and "[2, 3, 1]" should not be the same', () => {
    expect(arraysEqual([1, 2, 4], [2, 3, 1])).toBeFalsy()
  })
})

describe('should add or replace objects to results array', () => {
  it('should add new objects if id does not exist', () => {
    expect(addOrReplace([], { correct: true, questionId: 1 })).toEqual([
      { correct: true, questionId: 1 },
    ])
  })

  it('should replace objects if id exists', () => {
    expect(
      addOrReplace([{ correct: true, questionId: 1 }], {
        correct: false,
        questionId: 1,
      })
    ).toEqual([{ correct: false, questionId: 1 }])
  })
})

const dummyResults = [
  { correct: true, questionId: 1 },
  { correct: true, questionId: 2 },
  { correct: false, questionId: 3 },
]

it('should return 66% correct for 2 correct out of 3 questions', () => {
  expect(Math.floor(getCorrectPercentage(dummyResults))).toBe(66)
})

it('should return 33% correct for 1 incorrect out of 3 questions', () => {
  expect(Math.floor(getIncorrectPercentage(dummyResults))).toBe(33)
})

describe('should return true or false based on passed questionId', () => {
  it('should return true for question id: 2 as it is correct', () => {
    expect(isCorrect(dummyResults, 2)).toBeTruthy()
  })

  it('should return true for question id: 3 as it is incorrect', () => {
    expect(isCorrect(dummyResults, 3)).toBeFalsy()
  })
})
