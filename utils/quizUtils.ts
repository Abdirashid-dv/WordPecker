import { 
       QuizScore, 
       QuizReview, 
       QuizDifficulty, 
       QuizCategory 
     } from "@/types/quiz";
     import { 
       SCORE_THRESHOLDS, 
       SCORE_FEEDBACK,
       PERFORMANCE_SUGGESTIONS,
       QUIZ_CATEGORY_LABELS,
       QUIZ_DIFFICULTY_LABELS
     } from "@/constants/quiz";
     
     /**
      * Generates a feedback message based on quiz score
      */
     export const generateScoreFeedback = (score: number): string => {
       if (score >= SCORE_THRESHOLDS.EXCELLENT) {
         const messages = SCORE_FEEDBACK.EXCELLENT;
         return messages[Math.floor(Math.random() * messages.length)];
       } else if (score >= SCORE_THRESHOLDS.GOOD) {
         const messages = SCORE_FEEDBACK.GOOD;
         return messages[Math.floor(Math.random() * messages.length)];
       } else if (score >= SCORE_THRESHOLDS.AVERAGE) {
         const messages = SCORE_FEEDBACK.AVERAGE;
         return messages[Math.floor(Math.random() * messages.length)];
       } else {
         const messages = SCORE_FEEDBACK.POOR;
         return messages[Math.floor(Math.random() * messages.length)];
       }
     };
     
     /**
      * Generates improvement suggestions based on quiz performance
      */
     export const generateSuggestions = (
       score: QuizScore,
       reviewItems: QuizReview[],
       categories: QuizCategory[]
     ): string[] => {
       const suggestions: string[] = [];
       
       // Add suggestions based on score
       if (score.percentage < SCORE_THRESHOLDS.AVERAGE) {
         // Add general suggestions for low scores
         suggestions.push(PERFORMANCE_SUGGESTIONS.VOCABULARY);
         suggestions.push(PERFORMANCE_SUGGESTIONS.GRAMMAR);
       }
       
       // Add suggestions based on categories
       categories.forEach(category => {
         if (category === QuizCategory.VOCABULARY) {
           suggestions.push(PERFORMANCE_SUGGESTIONS.VOCABULARY);
         } else if (category === QuizCategory.GRAMMAR) {
           suggestions.push(PERFORMANCE_SUGGESTIONS.GRAMMAR);
         } else if (category === QuizCategory.IDIOMS) {
           suggestions.push(PERFORMANCE_SUGGESTIONS.IDIOMS);
         } else if (category === QuizCategory.SYNONYMS) {
           suggestions.push(PERFORMANCE_SUGGESTIONS.SYNONYMS);
         } else if (category === QuizCategory.ANTONYMS) {
           suggestions.push(PERFORMANCE_SUGGESTIONS.ANTONYMS);
         } else if (category === QuizCategory.SENTENCE_STRUCTURE) {
           suggestions.push(PERFORMANCE_SUGGESTIONS.SENTENCE_STRUCTURE);
         }
       });
       
       // Add time management suggestion if average time per question is high
       const averageTimePerQuestion = score.timeSpent / score.total;
       if (averageTimePerQuestion > 20) { // If average time is more than 20 seconds
         suggestions.push(PERFORMANCE_SUGGESTIONS.TIME_MANAGEMENT);
       }
       
       // Remove duplicates and return
       return [...new Set(suggestions)];
     };
     
     /**
      * Formats a quiz score for display
      */
     export const formatQuizScore = (score: QuizScore): string => {
       return `${score.correct}/${score.total} (${score.percentage}%)`;
     };
     
     /**
      * Formats a quiz difficulty for display
      */
     export const formatQuizDifficulty = (difficulty: QuizDifficulty): string => {
       return QUIZ_DIFFICULTY_LABELS[difficulty];
     };
     
     /**
      * Formats quiz categories for display
      */
     export const formatQuizCategories = (categories: QuizCategory[]): string => {
       return categories.map(category => QUIZ_CATEGORY_LABELS[category]).join(", ");
     };
     
     /**
      * Formats a time in seconds to MM:SS format
      */
     export const formatTime = (seconds: number): string => {
       const minutes = Math.floor(seconds / 60);
       const remainingSeconds = seconds % 60;
       
       return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
     };
     
     /**
      * Generates a share message for quiz results
      */
     export const generateShareMessage = (
       score: QuizScore,
       difficulty: QuizDifficulty,
       categories: QuizCategory[]
     ): string => {
       const categoryText = categories.length === 1 
         ? QUIZ_CATEGORY_LABELS[categories[0]] 
         : "mixed categories";
       
       return `I scored ${score.percentage}% on the ${QUIZ_DIFFICULTY_LABELS[difficulty]} ${categoryText} quiz in WordPecker! #LanguageLearning #WordPecker`;
     };