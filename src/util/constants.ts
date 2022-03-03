import { IQuestion } from '../types/question'

export const HTML_QUESTIONS: IQuestion[] = [
  {
    id: 0,
    question:
      'Which of the following element is responsible for making the text bold in HTML?',
    answers: ['<pre>', '<a>', '<b>', '<br>'],
    selectMultiple: false,
    correctAnswer: '<b>',
  },
  {
    id: 1,
    question: '<h1></h1> tag is used for inserting the largest heading in HTML',
    answers: ['true', 'false'],
    selectMultiple: false,
    correctAnswer: 'true',
  },
  {
    id: 2,
    question: 'An HTML program is saved by using the ____ extension',
    answers: ['.ht', '.html', '.hml', '.h'],
    selectMultiple: false,
    correctAnswer: '.html',
  },
  {
    id: 3,
    question: 'Match the correct sequence of HTML tags for starting a webpage',
    answers: [
      'Head, Title, HTML, body',
      'HTML, Body, Title, Head',
      'HTML, Head, Title, Body',
      'HTML, Title, Body, Head',
    ],
    selectMultiple: false,
    correctAnswer: 'HTML, Head, Title, Body',
  },
  {
    id: 4,
    question: 'Which of the following elements are block level elements?',
    answers: ['<div>', '<span>', '<ul>', '<button>'],
    selectMultiple: true,
    correctAnswer: ['<div>', '<ul>'],
  },
]

export const JAVASCRIPT_QUESTIONS: IQuestion[] = [
  {
    id: 0,
    question:
      'Which of the following keywords is used to define a variable in Javascript?',
    answers: ['var', 'let', 'both 1 and 2', 'None of these'],
    selectMultiple: false,
    correctAnswer: 'both 1 and 2',
  },
  {
    id: 1,
    question: 'Javascript is an _______ language?',
    answers: [
      'Object-Oriented',
      'Object-Based',
      'Assembly-language',
      'High-level',
    ],
    selectMultiple: false,
    correctAnswer: 'Object-Based',
  },
  {
    id: 2,
    question:
      'A conditional block is both a conditional block and a single statement',
    answers: ['true', 'false'],
    selectMultiple: false,
    correctAnswer: 'false',
  },
  {
    id: 3,
    question:
      'When interpreter encounters an empty statements, what it will do:',
    answers: [
      'Shows a warning',
      'Prompts to complete the statement',
      'Throws an error',
      'Ignores the statements',
    ],
    selectMultiple: false,
    correctAnswer: 'Ignores the statements',
  },
  {
    id: 4,
    question: 'Which of the following statements are true (Select Multiple)?',
    answers: [
      'Node.js needs a server to run',
      'React is not a JS library',
      'Javascript does not support classes',
      'Javascript and Typescript are two completely different language',
    ],
    selectMultiple: true,
    correctAnswer: ['Node.js needs a server to run'],
  },
]
