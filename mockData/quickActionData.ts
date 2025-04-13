import { ProgressData } from "@/types/progress";
import { QuickAction } from "@/types/quickAction";

// Helper to get ISO date string for a day offset from today
const getDateString = (daysAgo: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split("T")[0];
};

// Generate last 7 days of activity data
const generateDailyActivity = () => {
    return Array.from({ length: 7 }, (_, i) => ({
        date: getDateString(i),
        wordsLearned: Math.floor(Math.random() * 15) + 1,
        quizzesCompleted: Math.floor(Math.random() * 3),
        minutesSpent: Math.floor(Math.random() * 30) + 5,
    })).reverse();
};

export const mockProgressData: ProgressData = {
    words: {
        learned: 87,
        total: 200,
        mastered: 42,
        reviewing: 45,
    },
    quizzes: {
        completed: 14,
        averageScore: 82,
        bestScore: 96,
    },
    streak: {
        current: 5,
        longest: 12,
        lastActive: getDateString(0), // Today
    },
    dailyActivity: generateDailyActivity(),
    weeklyGoal: 100,
    weeklyProgress: 64,
};

export const mockQuickActions: QuickAction[] = [
    {
        id: "1",
        title: "Learn New Words",
        description: "Expand your vocabulary with new words.",
        icon: "book",
        route: "learn-new-words",
        color: "#FF5733",
        isEnabled: true,
        order: 1,
    },
    {
        id: "2",
        title: "Take a Quiz",
        description: "Test your knowledge with a quiz.",
        icon: "clipboard",
        route: "take-quiz",
        color: "#33FF57",
        isEnabled: true,
        order: 2,
    },
    {
        id: "3",
        title: "Track Progress",
        description: "View your learning progress and stats.",
        icon: "bar-chart",
        route: "track-progress",
        color: "#3357FF",
        isEnabled: true,
        order: 3,
    },
    {
        id: "4",
        title: "Settings",
        description: "Adjust your app settings.",
        icon: "settings",
        route: "settings",
        color: "#FF33A1",
        isEnabled: true,
        order: 4,
    },
    {
        id: "5",
        title: "Daily Challenge",
        description: "Complete today's challenge to earn rewards.",
        icon: "star",
        route: "daily-challenge",
        color: "#FF33F6",
        isEnabled: true,
        order: 5,
    },
    {
        id: "6",
        title: "Achievements",
        description: "View your achievements and badges.",
        icon: "trophy",
        route: "achievements",
        color: "#FF8C33",
        isEnabled: true,
        order: 6,
    },
    {
        id: "7",
        title: "Recommendations",
        description: "Get personalized word recommendations.",
        icon: "lightbulb",
        route: "recommendations",
        color: "#33FFF6",
        isEnabled: true,
        order: 7,
    },
    {
        id: "8",
        title: "Feedback",
        description: "Provide feedback about the app.",
        icon: "message-circle",
        route: "feedback",
        color: "#FF5733",
        isEnabled: true,
        order: 8,
    },
];
