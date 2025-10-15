import { QuestionI, ModifiedQuestionI } from "@/types/question";

export const mockedQuestions: QuestionI[] = [
  {
    category: "General Knowledge",
    type: "boolean",
    difficulty: "easy",
    question: "March 10th is also known as Mar10 Day.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "What type of animal was Harambe, who was shot after a child fell into its enclosure at the Cincinnati Zoo?",
    correct_answer: "Gorilla",
    incorrect_answers: ["Chimpanzee", "Orangutan", "Baboon"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "In which fast food chain can you order a Jamocha Shake?",
    correct_answer: "Arby's",
    incorrect_answers: ["McDonald's", "Burger King", "Wendy's"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "What zodiac sign is represented by a pair of scales?",
    correct_answer: "Libra",
    incorrect_answers: ["Virgo", "Taurus", "Gemini"],
  },
  {
    category: "General Knowledge",
    type: "boolean",
    difficulty: "easy",
    question: "The Great Wall of China is visible from the moon.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Which of the following is not the host of a program on NPR?",
    correct_answer: "Ben Shapiro",
    incorrect_answers: ["Terry Gross", "Scott Simon", "Steve Inskeep"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: 'What is "dabbing"?',
    correct_answer: "A dance",
    incorrect_answers: ["A cooking technique", "A card game", "A type of sports move"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "What do sailors call the back of a boat?",
    correct_answer: "Stern",
    incorrect_answers: ["Bow", "Port", "Starboard"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "What country has had prime ministers named Eden, Major, Peel, Law, Brown and Heath?",
    correct_answer: "United Kingdom",
    incorrect_answers: ["Canada", "Australia", "New Zealand"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Who is the author of Jurassic Park?",
    correct_answer: "Michael Crichton",
    incorrect_answers: ["Stephen King", "J.K. Rowling", "George R.R. Martin"],
  },
];

export const mockedModifiedQuestions: ModifiedQuestionI[] = [
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "March 10th is also known as Mar10 Day.",
    answers: [
      { id: "1", title: "True", correct: true, selected: false },
      { id: "2", title: "False", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "What type of animal was Harambe, who was shot after a child fell into its enclosure at the Cincinnati Zoo?",
    answers: [
      { id: "3", title: "Gorilla", correct: true, selected: false },
      { id: "4", title: "Chimpanzee", correct: false, selected: false },
      { id: "5", title: "Orangutan", correct: false, selected: false },
      { id: "6", title: "Baboon", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "In which fast food chain can you order a Jamocha Shake?",
    answers: [
      { id: "7", title: "Arby's", correct: true, selected: false },
      { id: "8", title: "McDonald's", correct: false, selected: false },
      { id: "9", title: "Burger King", correct: false, selected: false },
      { id: "10", title: "Wendy's", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "What zodiac sign is represented by a pair of scales?",
    answers: [
      { id: "11", title: "Libra", correct: true, selected: false },
      { id: "12", title: "Virgo", correct: false, selected: false },
      { id: "13", title: "Taurus", correct: false, selected: false },
      { id: "14", title: "Gemini", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "The Great Wall of China is visible from the moon.",
    answers: [
      { id: "15", title: "False", correct: true, selected: false },
      { id: "16", title: "True", correct: false, selected: false },
    ],
  },
  // You can continue for all 10 questions in the same format
];

export const mockedFinalQuestions: ModifiedQuestionI[] = [
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "March 10th is also known as Mar10 Day.",
    answers: [
      { id: "1", title: "True", correct: true, selected: true },
      { id: "2", title: "False", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "What type of animal was Harambe, who was shot after a child fell into its enclosure at the Cincinnati Zoo?",
    answers: [
      { id: "3", title: "Gorilla", correct: true, selected: false },
      { id: "4", title: "Chimpanzee", correct: false, selected: true },
      { id: "5", title: "Orangutan", correct: false, selected: false },
      { id: "6", title: "Baboon", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "In which fast food chain can you order a Jamocha Shake?",
    answers: [
      { id: "7", title: "Arby's", correct: true, selected: true },
      { id: "8", title: "McDonald's", correct: false, selected: false },
      { id: "9", title: "Burger King", correct: false, selected: false },
      { id: "10", title: "Wendy's", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "What zodiac sign is represented by a pair of scales?",
    answers: [
      { id: "11", title: "Libra", correct: true, selected: false },
      { id: "12", title: "Virgo", correct: false, selected: true },
      { id: "13", title: "Taurus", correct: false, selected: false },
      { id: "14", title: "Gemini", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "The Great Wall of China is visible from the moon.",
    answers: [
      { id: "15", title: "False", correct: true, selected: true },
      { id: "16", title: "True", correct: false, selected: false },
    ],
  },
  // You can continue for all 10 questions in the same format
];

export const mockedFinalQuestionsAllRight: ModifiedQuestionI[] = [
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "March 10th is also known as Mar10 Day.",
    answers: [
      { id: "1", title: "True", correct: true, selected: true },
      { id: "2", title: "False", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "What type of animal was Harambe, who was shot after a child fell into its enclosure at the Cincinnati Zoo?",
    answers: [
      { id: "3", title: "Gorilla", correct: true, selected: true },
      { id: "4", title: "Chimpanzee", correct: false, selected: false },
      { id: "5", title: "Orangutan", correct: false, selected: false },
      { id: "6", title: "Baboon", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "In which fast food chain can you order a Jamocha Shake?",
    answers: [
      { id: "7", title: "Arby's", correct: true, selected: true },
      { id: "8", title: "McDonald's", correct: false, selected: false },
      { id: "9", title: "Burger King", correct: false, selected: false },
      { id: "10", title: "Wendy's", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "What zodiac sign is represented by a pair of scales?",
    answers: [
      { id: "11", title: "Libra", correct: true, selected: true },
      { id: "12", title: "Virgo", correct: false, selected: false },
      { id: "13", title: "Taurus", correct: false, selected: false },
      { id: "14", title: "Gemini", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "The Great Wall of China is visible from the moon.",
    answers: [
      { id: "15", title: "False", correct: true, selected: true },
      { id: "16", title: "True", correct: false, selected: false },
    ],
  },
];
export const mockedFinalQuestionsNoneSelected: ModifiedQuestionI[] = [
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "March 10th is also known as Mar10 Day.",
    answers: [
      { id: "1", title: "True", correct: true, selected: false },
      { id: "2", title: "False", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title:
      "What type of animal was Harambe, who was shot after a child fell into its enclosure at the Cincinnati Zoo?",
    answers: [
      { id: "3", title: "Gorilla", correct: true, selected: false },
      { id: "4", title: "Chimpanzee", correct: false, selected: false },
      { id: "5", title: "Orangutan", correct: false, selected: false },
      { id: "6", title: "Baboon", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "In which fast food chain can you order a Jamocha Shake?",
    answers: [
      { id: "7", title: "Arby's", correct: true, selected: false },
      { id: "8", title: "McDonald's", correct: false, selected: false },
      { id: "9", title: "Burger King", correct: false, selected: false },
      { id: "10", title: "Wendy's", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "What zodiac sign is represented by a pair of scales?",
    answers: [
      { id: "11", title: "Libra", correct: true, selected: false },
      { id: "12", title: "Virgo", correct: false, selected: false },
      { id: "13", title: "Taurus", correct: false, selected: false },
      { id: "14", title: "Gemini", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "The Great Wall of China is visible from the moon.",
    answers: [
      { id: "15", title: "False", correct: true, selected: false },
      { id: "16", title: "True", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "Which of the following is not the host of a program on NPR?",
    answers: [
      { id: "17", title: "Ben Shapiro", correct: true, selected: false },
      { id: "18", title: "Terry Gross", correct: false, selected: false },
      { id: "19", title: "Scott Simon", correct: false, selected: false },
      { id: "20", title: "Steve Inskeep", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: 'What is "dabbing"?',
    answers: [
      { id: "21", title: "A dance", correct: true, selected: false },
      { id: "22", title: "A cooking technique", correct: false, selected: false },
      { id: "23", title: "A card game", correct: false, selected: false },
      { id: "24", title: "A type of sports move", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "What do sailors call the back of a boat?",
    answers: [
      { id: "25", title: "Stern", correct: true, selected: false },
      { id: "26", title: "Bow", correct: false, selected: false },
      { id: "27", title: "Port", correct: false, selected: false },
      { id: "28", title: "Starboard", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title:
      "What country has had prime ministers named Eden, Major, Peel, Law, Brown and Heath?",
    answers: [
      { id: "29", title: "United Kingdom", correct: true, selected: false },
      { id: "30", title: "Canada", correct: false, selected: false },
      { id: "31", title: "Australia", correct: false, selected: false },
      { id: "32", title: "New Zealand", correct: false, selected: false },
    ],
  },
  {
    difficulty: "easy",
    category: "General Knowledge",
    title: "Who is the author of Jurassic Park?",
    answers: [
      { id: "33", title: "Michael Crichton", correct: true, selected: false },
      { id: "34", title: "Stephen King", correct: false, selected: false },
      { id: "35", title: "J.K. Rowling", correct: false, selected: false },
      { id: "36", title: "George R.R. Martin", correct: false, selected: false },
    ],
  },
];
