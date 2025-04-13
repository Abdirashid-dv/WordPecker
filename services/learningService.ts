import { mockQuestions, getMixedQuestions } from "@/mockData/questions";
import { Question, QuestionType, SessionHistory } from "@/types/learning";

/**
 * Fetches questions from the mock data
 * In a real app, this would fetch from an API
 */
export const getQuestions = async (
  types: QuestionType[] = [QuestionType.MULTIPLE_CHOICE],
  count: number = 10
): Promise<Question[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Return mixed questions of the specified types
  return getMixedQuestions(types, count);
};

/**
 * Saves session results
 * In a real app, this would send data to an API
 */
export const saveSessionResults = async (
  sessionData: SessionHistory
): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // In a real app, this would send data to a server
  console.log("Session results saved:", sessionData);
};

/**
 * Fetches user learning statistics
 * In a real app, this would fetch from an API
 */
export const getUserStats = async (): Promise<{
  totalCorrect: number;
  totalQuestions: number;
  averageAccuracy: number;
  exerciseTypeBreakdown: Record<QuestionType, number>;
  averageTimePerQuestion: number;
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // Mock data
  return {
    totalCorrect: 120,
    totalQuestions: 200,
    averageAccuracy: 60,
    exerciseTypeBreakdown: {
      [QuestionType.MULTIPLE_CHOICE]: 120,
      [QuestionType.TRUE_FALSE]: 50,
      [QuestionType.FILL_IN_BLANK]: 20,
      [QuestionType.MATCHING]: 10,
    },
    averageTimePerQuestion: 15, // seconds
  };
};

/**
 * Analyzes learning patterns
 * In a real app, this would use an API or ML model
 */
export const analyzeLearningPatterns = async (
  sessionHistory: SessionHistory[]
): Promise<{
  recommendedExerciseTypes: QuestionType[];
  improvementAreas: string[];
  strengths: string[];
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Mock analysis
  return {
    recommendedExerciseTypes: [
      QuestionType.FILL_IN_BLANK,
      QuestionType.MATCHING
    ],
    improvementAreas: [
      "Vocabulary retention",
      "Grammar application"
    ],
    strengths: [
      "Word recognition",
      "Basic sentence structure"
    ]
  };
};