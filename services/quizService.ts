import { 
       QuizQuestion, 
       QuizDifficulty, 
       QuizCategory,
       QuizSession
     } from "@/types/quiz";
     import { 
       mockQuizQuestions, 
       getMixedQuizQuestions 
     } from "@/mockData/quizQuestions";
     
     /**
      * Fetches quiz questions from the mock data
      * In a real app, this would fetch from an API
      */
     export const getQuizQuestions = async (
       difficulty: QuizDifficulty = QuizDifficulty.MEDIUM,
       categories: QuizCategory[] = [],
       count: number = 10
     ): Promise<QuizQuestion[]> => {
       // Simulate API delay
       await new Promise((resolve) => setTimeout(resolve, 500));
       
       // Return mixed questions of the specified difficulty and categories
       return getMixedQuizQuestions(difficulty, categories, count);
     };
     
     /**
      * Saves quiz results
      * In a real app, this would send data to an API
      */
     export const saveQuizResults = async (
       quizData: QuizSession
     ): Promise<void> => {
       // Simulate API delay
       await new Promise((resolve) => setTimeout(resolve, 300));
       
       // In a real app, this would send data to a server
       console.log("Quiz results saved:", quizData);
     };
     
     /**
      * Fetches user quiz statistics
      * In a real app, this would fetch from an API
      */
     export const getUserQuizStats = async (): Promise<{
       totalQuizzes: number;
       averageScore: number;
       bestCategory: QuizCategory;
       worstCategory: QuizCategory;
       completionRate: number;
     }> => {
       // Simulate API delay
       await new Promise((resolve) => setTimeout(resolve, 300));
       
       // Mock data
       return {
         totalQuizzes: 15,
         averageScore: 72,
         bestCategory: QuizCategory.VOCABULARY,
         worstCategory: QuizCategory.GRAMMAR,
         completionRate: 85, // percentage
       };
     };
     
     /**
      * Analyzes quiz performance
      * In a real app, this would use an API or ML model
      */
     export const analyzeQuizPerformance = async (
       quizSessions: QuizSession[]
     ): Promise<{
       recommendedCategories: QuizCategory[];
       improvementAreas: string[];
       strengths: string[];
       recommendedDifficulty: QuizDifficulty;
     }> => {
       // Simulate API delay
       await new Promise((resolve) => setTimeout(resolve, 500));
       
       // Mock analysis
       return {
         recommendedCategories: [
           QuizCategory.GRAMMAR,
           QuizCategory.IDIOMS
         ],
         improvementAreas: [
           "Grammar rules application",
           "Idiomatic expressions"
         ],
         strengths: [
           "Vocabulary recognition",
           "Synonyms identification"
         ],
         recommendedDifficulty: QuizDifficulty.MEDIUM
       };
     };