/**
 * Formats seconds into a readable time string (MM:SS or HH:MM:SS)
 */
export const formatTime = (seconds: number): string => {
       if (seconds < 0) return "00:00";
       
       const hours = Math.floor(seconds / 3600);
       const minutes = Math.floor((seconds % 3600) / 60);
       const remainingSeconds = seconds % 60;
       
       const formattedMinutes = String(minutes).padStart(2, "0");
       const formattedSeconds = String(remainingSeconds).padStart(2, "0");
       
       if (hours > 0) {
         const formattedHours = String(hours).padStart(2, "0");
         return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
       }
       
       return `${formattedMinutes}:${formattedSeconds}`;
     };
     
     /**
      * Calculates the average time per question in seconds
      */
     export const calculateAverageTimePerQuestion = (
       totalTimeSeconds: number,
       questionCount: number
     ): number => {
       if (questionCount <= 0) return 0;
       return Math.round(totalTimeSeconds / questionCount);
     };
     
     /**
      * Formats a date string to a readable format
      */
     export const formatDate = (dateString: string): string => {
       const date = new Date(dateString);
       return date.toLocaleDateString(undefined, {
         year: "numeric",
         month: "short",
         day: "numeric",
       });
     };