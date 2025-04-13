import { QuizQuestion, QuizDifficulty, QuizCategory } from "@/types/quiz";
import { QuestionType } from "@/types/learning";

export const mockQuizQuestions: QuizQuestion[] = [
  // Vocabulary questions
  {
    id: "q1",
    text: "What is the meaning of 'ubiquitous'?",
    options: [
      { id: "a", text: "Present everywhere" },
      { id: "b", text: "Extremely rare" },
      { id: "c", text: "Highly valuable" },
      { id: "d", text: "Easily broken" },
    ],
    correctOptionId: "a",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.HARD,
    category: QuizCategory.VOCABULARY,
    explanation: "Ubiquitous means present, appearing, or found everywhere. For example, 'Mobile phones are now ubiquitous in modern society.'"
  },
  {
    id: "q2",
    text: "What is the meaning of 'ephemeral'?",
    options: [
      { id: "a", text: "Lasting forever" },
      { id: "b", text: "Lasting for a very short time" },
      { id: "c", text: "Extremely powerful" },
      { id: "d", text: "Highly contagious" },
    ],
    correctOptionId: "b",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.HARD,
    category: QuizCategory.VOCABULARY,
    explanation: "Ephemeral means lasting for a very short time. For example, 'The ephemeral beauty of cherry blossoms lasts only a few days.'"
  },
  
  // Synonyms questions
  {
    id: "q3",
    text: "Choose the synonym for 'happy':",
    options: [
      { id: "a", text: "Sad" },
      { id: "b", text: "Angry" },
      { id: "c", text: "Joyful" },
      { id: "d", text: "Tired" },
    ],
    correctOptionId: "c",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.EASY,
    category: QuizCategory.SYNONYMS,
    word: "happy",
    explanation: "Joyful is a synonym for happy, meaning experiencing or showing joy."
  },
  {
    id: "q4",
    text: "Choose the synonym for 'intelligent':",
    options: [
      { id: "a", text: "Smart" },
      { id: "b", text: "Dull" },
      { id: "c", text: "Slow" },
      { id: "d", text: "Weak" },
    ],
    correctOptionId: "a",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.EASY,
    category: QuizCategory.SYNONYMS,
    word: "intelligent",
    explanation: "Smart is a synonym for intelligent, meaning having or showing a quick-witted intelligence."
  },
  
  // Antonyms questions
  {
    id: "q5",
    text: "Choose the antonym for 'brave':",
    options: [
      { id: "a", text: "Courageous" },
      { id: "b", text: "Fearless" },
      { id: "c", text: "Cowardly" },
      { id: "d", text: "Bold" },
    ],
    correctOptionId: "c",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.MEDIUM,
    category: QuizCategory.ANTONYMS,
    word: "brave",
    explanation: "Cowardly is an antonym for brave, meaning lacking courage."
  },
  {
    id: "q6",
    text: "Choose the antonym for 'generous':",
    options: [
      { id: "a", text: "Giving" },
      { id: "b", text: "Stingy" },
      { id: "c", text: "Kind" },
      { id: "d", text: "Charitable" },
    ],
    correctOptionId: "b",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.MEDIUM,
    category: QuizCategory.ANTONYMS,
    word: "generous",
    explanation: "Stingy is an antonym for generous, meaning unwilling to give or spend."
  },
  
  // Sentence completion
  {
    id: "q7",
    text: "Complete the sentence:",
    sentence: "The professor's lecture was so _____ that several students fell asleep.",
    options: [
      { id: "a", text: "engaging" },
      { id: "b", text: "fascinating" },
      { id: "c", text: "boring" },
      { id: "d", text: "exciting" },
    ],
    correctOptionId: "c",
    type: QuestionType.FILL_IN_BLANK,
    difficulty: QuizDifficulty.MEDIUM,
    category: QuizCategory.SENTENCE_STRUCTURE,
    explanation: "The context suggests a negative quality that would cause students to fall asleep, making 'boring' the most logical choice."
  },
  {
    id: "q8",
    text: "Complete the sentence:",
    sentence: "Despite his _____ schedule, he always finds time to help others.",
    options: [
      { id: "a", text: "empty" },
      { id: "b", text: "hectic" },
      { id: "c", text: "boring" },
      { id: "d", text: "simple" },
    ],
    correctOptionId: "b",
    type: QuestionType.FILL_IN_BLANK,
    difficulty: QuizDifficulty.MEDIUM,
    category: QuizCategory.SENTENCE_STRUCTURE,
    explanation: "The word 'despite' indicates a contrast, suggesting his schedule is busy or full, making 'hectic' the most appropriate choice."
  },
  
  // Grammar questions
  {
    id: "q9",
    text: "Which sentence is grammatically correct?",
    options: [
      { id: "a", text: "She don't like coffee." },
      { id: "b", text: "She doesn't likes coffee." },
      { id: "c", text: "She doesn't like coffee." },
      { id: "d", text: "She not like coffee." },
    ],
    correctOptionId: "c",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.EASY,
    category: QuizCategory.GRAMMAR,
    explanation: "For third-person singular subjects (he, she, it), we use 'doesn't' followed by the base form of the verb."
  },
  {
    id: "q10",
    text: "Choose the correct form:",
    options: [
      { id: "a", text: "I have went to the store." },
      { id: "b", text: "I have gone to the store." },
      { id: "c", text: "I have goed to the store." },
      { id: "d", text: "I have going to the store." },
    ],
    correctOptionId: "b",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.MEDIUM,
    category: QuizCategory.GRAMMAR,
    explanation: "The present perfect tense uses 'have/has' + past participle. The past participle of 'go' is 'gone'."
  },
  
  // Idioms
  {
    id: "q11",
    text: "What does the idiom 'break the ice' mean?",
    options: [
      { id: "a", text: "To literally break ice" },
      { id: "b", text: "To do something dangerous" },
      { id: "c", text: "To make people feel more comfortable in a social situation" },
      { id: "d", text: "To cool down a drink" },
    ],
    correctOptionId: "c",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.MEDIUM,
    category: QuizCategory.IDIOMS,
    explanation: "To 'break the ice' means to do or say something to relieve initial tension or awkwardness in a social situation."
  },
  {
    id: "q12",
    text: "What does the idiom 'cost an arm and a leg' mean?",
    options: [
      { id: "a", text: "To cause physical injury" },
      { id: "b", text: "To be very expensive" },
      { id: "c", text: "To require medical attention" },
      { id: "d", text: "To need help from others" },
    ],
    correctOptionId: "b",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.MEDIUM,
    category: QuizCategory.IDIOMS,
    explanation: "When something 'costs an arm and a leg,' it means it is very expensive or excessively costly."
  },
  
  // Expert level vocabulary
  {
    id: "q13",
    text: "What is the meaning of 'sycophant'?",
    options: [
      { id: "a", text: "A musical instrument" },
      { id: "b", text: "A person who acts obsequiously toward someone to gain advantage" },
      { id: "c", text: "A type of ancient currency" },
      { id: "d", text: "A medical condition" },
    ],
    correctOptionId: "b",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.EXPERT,
    category: QuizCategory.VOCABULARY,
    explanation: "A sycophant is a person who acts obsequiously toward someone important in order to gain advantage; in simple terms, a flatterer or 'yes-man'."
  },
  {
    id: "q14",
    text: "What is the meaning of 'perfunctory'?",
    options: [
      { id: "a", text: "Done routinely and with little interest or care" },
      { id: "b", text: "Extremely detailed and thorough" },
      { id: "c", text: "Relating to perfume or fragrance" },
      { id: "d", text: "Perfectly functional" },
    ],
    correctOptionId: "a",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.EXPERT,
    category: QuizCategory.VOCABULARY,
    explanation: "Perfunctory describes an action performed merely as a routine duty, without genuine interest, enthusiasm, or care."
  },
  
  // Expert level grammar
  {
    id: "q15",
    text: "Which sentence uses the subjunctive mood correctly?",
    options: [
      { id: "a", text: "I wish I was taller." },
      { id: "b", text: "I wish I were taller." },
      { id: "c", text: "I wish I am taller." },
      { id: "d", text: "I wish I be taller." },
    ],
    correctOptionId: "b",
    type: QuestionType.MULTIPLE_CHOICE,
    difficulty: QuizDifficulty.EXPERT,
    category: QuizCategory.GRAMMAR,
    explanation: "The subjunctive mood is used to express wishes, hypothetical situations, or conditions contrary to fact. After 'I wish,' we use 'were' for all persons, not 'was'."
  },
];

// Function to get quiz questions by difficulty
export const getQuizQuestionsByDifficulty = (difficulty: QuizDifficulty): QuizQuestion[] => {
  return mockQuizQuestions.filter(question => question.difficulty === difficulty);
};

// Function to get quiz questions by category
export const getQuizQuestionsByCategory = (category: QuizCategory): QuizQuestion[] => {
  return mockQuizQuestions.filter(question => question.category === category);
};

// Function to get a mix of quiz questions with specified difficulty and categories
export const getMixedQuizQuestions = (
  difficulty: QuizDifficulty, 
  categories: QuizCategory[], 
  count: number
): QuizQuestion[] => {
  // Filter questions by difficulty and categories
  const filteredQuestions = mockQuizQuestions.filter(
    question => 
      question.difficulty === difficulty && 
      (categories.length === 0 || categories.includes(question.category as QuizCategory))
  );
  
  // If not enough questions match the criteria, include questions from adjacent difficulty levels
  let additionalQuestions: QuizQuestion[] = [];
  if (filteredQuestions.length < count) {
    const difficulties = Object.values(QuizDifficulty);
    const currentIndex = difficulties.indexOf(difficulty);
    
    // Try adjacent difficulty levels
    if (currentIndex > 0) {
      // Try one level easier
      const easierDifficulty = difficulties[currentIndex - 1];
      additionalQuestions = [
        ...additionalQuestions,
        ...mockQuizQuestions.filter(
          question => 
            question.difficulty === easierDifficulty && 
            (categories.length === 0 || categories.includes(question.category as QuizCategory))
        )
      ];
    }
    
    if (currentIndex < difficulties.length - 1) {
      // Try one level harder
      const harderDifficulty = difficulties[currentIndex + 1];
      additionalQuestions = [
        ...additionalQuestions,
        ...mockQuizQuestions.filter(
          question => 
            question.difficulty === harderDifficulty && 
            (categories.length === 0 || categories.includes(question.category as QuizCategory))
        )
      ];
    }
  }
  
  // Combine and shuffle all available questions
  const allAvailableQuestions = [...filteredQuestions, ...additionalQuestions];
  const shuffled = [...allAvailableQuestions].sort(() => Math.random() - 0.5);
  
  // Return the requested number of questions or all if count is greater
  return shuffled.slice(0, Math.min(count, shuffled.length));
};