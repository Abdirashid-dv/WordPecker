import { Question, QuestionType } from "@/types/learning";

export const mockQuestions: Question[] = [
  // Multiple choice questions
  {
    id: "q1",
    text: "What is the meaning of 'apple'?",
    options: [
      { id: "a", text: "A fruit" },
      { id: "b", text: "A car" },
      { id: "c", text: "A book" },
      { id: "d", text: "A computer" },
    ],
    correctOptionId: "a",
    type: QuestionType.MULTIPLE_CHOICE,
    explanation: "An apple is a round fruit with red, green, or yellow skin and firm white flesh."
  },
  {
    id: "q2",
    text: "What is the meaning of 'house'?",
    options: [
      { id: "a", text: "A place to live" },
      { id: "b", text: "A type of food" },
      { id: "c", text: "A vehicle" },
      { id: "d", text: "A musical instrument" },
    ],
    correctOptionId: "a",
    type: QuestionType.MULTIPLE_CHOICE,
    explanation: "A house is a building for human habitation, especially one that is lived in by a family or small group of people."
  },
  {
    id: "q3",
    text: "What is the meaning of 'car'?",
    options: [
      { id: "a", text: "A fruit" },
      { id: "b", text: "A vehicle" },
      { id: "c", text: "A building" },
      { id: "d", text: "An animal" },
    ],
    correctOptionId: "b",
    type: QuestionType.MULTIPLE_CHOICE,
    explanation: "A car is a road vehicle, typically with four wheels, powered by an engine and able to carry a small number of people."
  },
  
  // True/False questions
  {
    id: "q4",
    text: "True or False:",
    statement: "A 'book' is something you can read.",
    options: [
      { id: "true", text: "True" },
      { id: "false", text: "False" },
    ],
    correctOptionId: "true",
    type: QuestionType.TRUE_FALSE,
    isTrue: true,
    explanation: "A book is a written or printed work consisting of pages glued or sewn together along one side and bound in covers."
  },
  {
    id: "q5",
    text: "True or False:",
    statement: "A 'dog' is a type of fruit.",
    options: [
      { id: "true", text: "True" },
      { id: "false", text: "False" },
    ],
    correctOptionId: "false",
    type: QuestionType.TRUE_FALSE,
    isTrue: false,
    explanation: "A dog is a domesticated carnivorous mammal, not a fruit."
  },
  {
    id: "q6",
    text: "True or False:",
    statement: "To 'run' means to move quickly on foot.",
    options: [
      { id: "true", text: "True" },
      { id: "false", text: "False" },
    ],
    correctOptionId: "true",
    type: QuestionType.TRUE_FALSE,
    isTrue: true,
    explanation: "Running is the action of moving at a speed faster than walking, never having both feet on the ground at the same time."
  },
  
  // Fill in the blank questions
  {
    id: "q7",
    text: "Complete the sentence:",
    statement: "Water is a clear _____ that we drink.",
    options: [
      { id: "a", text: "liquid" },
      { id: "b", text: "solid" },
      { id: "c", text: "gas" },
      { id: "d", text: "food" },
    ],
    correctOptionId: "a",
    type: QuestionType.FILL_IN_BLANK,
    blanks: ["liquid"],
    explanation: "Water is a clear liquid that is essential for all forms of life."
  },
  {
    id: "q8",
    text: "Complete the sentence:",
    statement: "The _____ is the star at the center of our solar system.",
    options: [
      { id: "a", text: "moon" },
      { id: "b", text: "earth" },
      { id: "c", text: "sun" },
      { id: "d", text: "mars" },
    ],
    correctOptionId: "c",
    type: QuestionType.FILL_IN_BLANK,
    blanks: ["sun"],
    explanation: "The sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma."
  },
  
  // Matching questions
  {
    id: "q9",
    text: "Match the words with their meanings:",
    type: QuestionType.MATCHING,
    matchPairs: [
      { left: "Phone", right: "Communication device" },
      { left: "Table", right: "Piece of furniture" },
      { left: "Bicycle", right: "Two-wheeled vehicle" },
    ],
    options: [
      { id: "a", text: "Phone - Communication device" },
      { id: "b", text: "Phone - Piece of furniture" },
      { id: "c", text: "Table - Communication device" },
      { id: "d", text: "Table - Piece of furniture" },
      { id: "e", text: "Bicycle - Communication device" },
      { id: "f", text: "Bicycle - Two-wheeled vehicle" },
    ],
    correctOptionId: "a,d,f",
    explanation: "A phone is a communication device, a table is a piece of furniture, and a bicycle is a two-wheeled vehicle."
  },
  {
    id: "q10",
    text: "Match the words with their categories:",
    type: QuestionType.MATCHING,
    matchPairs: [
      { left: "Apple", right: "Fruit" },
      { left: "Carrot", right: "Vegetable" },
      { left: "Salmon", right: "Fish" },
    ],
    options: [
      { id: "a", text: "Apple - Fruit" },
      { id: "b", text: "Apple - Vegetable" },
      { id: "c", text: "Carrot - Fruit" },
      { id: "d", text: "Carrot - Vegetable" },
      { id: "e", text: "Salmon - Vegetable" },
      { id: "f", text: "Salmon - Fish" },
    ],
    correctOptionId: "a,d,f",
    explanation: "An apple is a fruit, a carrot is a vegetable, and salmon is a fish."
  },
  
  // Additional multiple choice questions
  {
    id: "q11",
    text: "What is the meaning of 'computer'?",
    options: [
      { id: "a", text: "An electronic device for processing data" },
      { id: "b", text: "A type of fruit" },
      { id: "c", text: "A musical instrument" },
      { id: "d", text: "A vehicle" },
    ],
    correctOptionId: "a",
    type: QuestionType.MULTIPLE_CHOICE,
    explanation: "A computer is an electronic device that manipulates information or data."
  },
  {
    id: "q12",
    text: "What is the meaning of 'bicycle'?",
    options: [
      { id: "a", text: "A type of food" },
      { id: "b", text: "A two-wheeled vehicle" },
      { id: "c", text: "A building" },
      { id: "d", text: "A type of clothing" },
    ],
    correctOptionId: "b",
    type: QuestionType.MULTIPLE_CHOICE,
    explanation: "A bicycle is a vehicle with two wheels, powered by a person who pushes pedals with their feet."
  },
];

// Function to get questions by type
export const getQuestionsByType = (type: QuestionType): Question[] => {
  return mockQuestions.filter(question => question.type === type);
};

// Function to get a mix of questions with specified types
export const getMixedQuestions = (types: QuestionType[], count: number): Question[] => {
  const filteredQuestions = mockQuestions.filter(question => types.includes(question.type));
  
  // Shuffle the filtered questions
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
  
  // Return the requested number of questions or all if count is greater
  return shuffled.slice(0, Math.min(count, shuffled.length));
};