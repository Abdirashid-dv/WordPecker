import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Question,
    SessionHistory,
    QuestionType,
    LearningSettings,
} from "@/types/learning";
import { DEFAULT_LEARNING_SETTINGS } from "@/constants/learning";

interface LearningState {
    questions: Question[];
    currentQuestionIndex: number;
    progress: {
        current: number;
        total: number;
    };
    streak: {
        current: number;
        highest: number;
    };
    currentSession: {
        correct: number;
        total: number;
        date: string;
        exerciseTypes: QuestionType[];
        startTime: string;
        timeSpent: number;
    };
    sessionHistory: SessionHistory[];
    totalCorrect: number;
    totalQuestions: number;
    settings: LearningSettings;

    // Actions
    setQuestions: (questions: Question[]) => void;
    setCurrentQuestionIndex: (index: number) => void;
    incrementProgress: () => void;
    incrementStreak: () => void;
    resetStreak: () => void;
    updateHighestStreak: () => void;
    incrementCorrectAnswers: () => void;
    completeSession: () => void;
    startNewSession: (
        totalQuestions: number,
        exerciseTypes: QuestionType[]
    ) => void;
    updateSessionTime: (seconds: number) => void;
    updateSettings: (settings: Partial<LearningSettings>) => void;
    clearHistory: () => void;
}

export const useLearningStore = create<LearningState>()(
    persist(
        (set) => ({
            questions: [],
            currentQuestionIndex: 0,
            progress: {
                current: 1,
                total: 0,
            },
            streak: {
                current: 0,
                highest: 0,
            },
            currentSession: {
                correct: 0,
                total: 0,
                date: new Date().toISOString(),
                exerciseTypes: [QuestionType.MULTIPLE_CHOICE],
                startTime: new Date().toISOString(),
                timeSpent: 0,
            },
            sessionHistory: [],
            totalCorrect: 0,
            totalQuestions: 0,
            settings: DEFAULT_LEARNING_SETTINGS,

            setQuestions: (questions) => set({ questions }),

            setCurrentQuestionIndex: (index) =>
                set({ currentQuestionIndex: index }),

            incrementProgress: () =>
                set((state) => ({
                    progress: {
                        ...state.progress,
                        current: state.progress.current + 1,
                    },
                })),

            incrementStreak: () =>
                set((state) => ({
                    streak: {
                        ...state.streak,
                        current: state.streak.current + 1,
                    },
                })),

            resetStreak: () =>
                set((state) => ({
                    streak: {
                        ...state.streak,
                        current: 0,
                    },
                })),

            updateHighestStreak: () =>
                set((state) => ({
                    streak: {
                        ...state.streak,
                        highest: Math.max(
                            state.streak.current,
                            state.streak.highest
                        ),
                    },
                })),

            incrementCorrectAnswers: () =>
                set((state) => ({
                    currentSession: {
                        ...state.currentSession,
                        correct: state.currentSession.correct + 1,
                    },
                    totalCorrect: state.totalCorrect + 1,
                })),

            completeSession: () =>
                set((state) => {
                    const endTime = new Date();
                    const startTime = new Date(state.currentSession.startTime);
                    const timeSpentSeconds = Math.floor(
                        (endTime.getTime() - startTime.getTime()) / 1000
                    );

                    const newSessionHistory: SessionHistory = {
                        date: state.currentSession.date,
                        correct: state.currentSession.correct,
                        total: state.currentSession.total,
                        streakHighest: state.streak.highest,
                        exerciseTypes: state.currentSession.exerciseTypes,
                        timeSpent: timeSpentSeconds,
                    };

                    return {
                        sessionHistory: [
                            newSessionHistory,
                            ...state.sessionHistory.slice(0, 19),
                        ], // Keep last 20 sessions
                        currentSession: {
                            ...state.currentSession,
                            timeSpent: timeSpentSeconds,
                        },
                    };
                }),

            startNewSession: (totalQuestions, exerciseTypes) =>
                set({
                    currentQuestionIndex: 0,
                    progress: {
                        current: 1,
                        total: totalQuestions,
                    },
                    streak: {
                        current: 0,
                        highest: 0,
                    },
                    currentSession: {
                        correct: 0,
                        total: totalQuestions,
                        date: new Date().toISOString(),
                        exerciseTypes: exerciseTypes,
                        startTime: new Date().toISOString(),
                        timeSpent: 0,
                    },
                    totalQuestions: totalQuestions,
                }),

            updateSessionTime: (seconds) =>
                set((state) => ({
                    currentSession: {
                        ...state.currentSession,
                        timeSpent: seconds,
                    },
                })),

            updateSettings: (newSettings) =>
                set((state) => ({
                    settings: {
                        ...state.settings,
                        ...newSettings,
                    },
                })),

            clearHistory: () =>
                set({
                    sessionHistory: [],
                    totalCorrect: 0,
                    totalQuestions: 0,
                }),
        }),
        {
            name: "learning-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
