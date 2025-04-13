import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    QuizQuestion,
    QuizScore,
    QuizReview,
    QuizSession,
    QuizSettings,
    QuizProgress,
    QuizTimerState,
    QuizDifficulty,
    QuizCategory,
} from "@/types/quiz";
import { DEFAULT_QUIZ_SETTINGS } from "@/constants/quiz";

interface QuizState {
    questions: QuizQuestion[];
    currentQuestionIndex: number;
    progress: QuizProgress;
    score: QuizScore;
    reviewItems: QuizReview[];
    quizSessions: QuizSession[];
    settings: QuizSettings;
    timer: QuizTimerState;
    isQuizComplete: boolean;
    isReviewMode: boolean;

    // Actions
    setQuestions: (questions: QuizQuestion[]) => void;
    setCurrentQuestionIndex: (index: number) => void;
    incrementProgress: () => void;
    recordAnswer: (
        questionId: string,
        userAnswerId: string,
        timeSpent: number
    ) => void;
    skipQuestion: () => void;
    completeQuiz: () => void;
    startNewQuiz: (questions: QuizQuestion[]) => void;
    updateSettings: (settings: Partial<QuizSettings>) => void;
    startTimer: (duration: number) => void;
    pauseTimer: () => void;
    resumeTimer: () => void;
    stopTimer: () => void;
    decrementTimer: () => void;
    setReviewMode: (isReviewMode: boolean) => void;
    clearHistory: () => void;
}

export const useQuizStore = create<QuizState>()(
    persist(
        (set, get) => ({
            questions: [],
            currentQuestionIndex: 0,
            progress: {
                current: 1,
                total: 0,
            },
            score: {
                correct: 0,
                incorrect: 0,
                skipped: 0,
                total: 0,
                percentage: 0,
                timeSpent: 0,
            },
            reviewItems: [],
            quizSessions: [],
            settings: DEFAULT_QUIZ_SETTINGS,
            timer: {
                isActive: false,
                timeRemaining: 0,
                totalTime: 0,
            },
            isQuizComplete: false,
            isReviewMode: false,

            setQuestions: (questions) =>
                set({
                    questions,
                    progress: {
                        current: 1,
                        total: questions.length,
                    },
                }),

            setCurrentQuestionIndex: (index) =>
                set({
                    currentQuestionIndex: index,
                    progress: {
                        ...get().progress,
                        current: index + 1,
                    },
                }),

            incrementProgress: () =>
                set((state) => {
                    const nextIndex = state.currentQuestionIndex + 1;
                    return {
                        currentQuestionIndex: nextIndex,
                        progress: {
                            ...state.progress,
                            current: nextIndex + 1,
                        },
                    };
                }),

            recordAnswer: (questionId, userAnswerId, timeSpent) =>
                set((state) => {
                    const question = state.questions.find(
                        (q) => q.id === questionId
                    );
                    if (!question) return state;

                    const isCorrect = userAnswerId === question.correctOptionId;
                    const correctOption = question.options.find(
                        (opt) => opt.id === question.correctOptionId
                    );
                    const userOption = question.options.find(
                        (opt) => opt.id === userAnswerId
                    );

                    const reviewItem: QuizReview = {
                        questionId,
                        question: question.text,
                        userAnswer: userOption?.text || "No answer",
                        correctAnswer: correctOption?.text || "Unknown",
                        explanation: question.explanation,
                        timeSpent,
                    };

                    return {
                        score: {
                            ...state.score,
                            correct: isCorrect
                                ? state.score.correct + 1
                                : state.score.correct,
                            incorrect: !isCorrect
                                ? state.score.incorrect + 1
                                : state.score.incorrect,
                            total: state.questions.length,
                            percentage: Math.round(
                                ((isCorrect
                                    ? state.score.correct + 1
                                    : state.score.correct) /
                                    state.questions.length) *
                                    100
                            ),
                            timeSpent: state.score.timeSpent + timeSpent,
                        },
                        reviewItems: isCorrect
                            ? state.reviewItems
                            : [...state.reviewItems, reviewItem],
                    };
                }),

            skipQuestion: () =>
                set((state) => ({
                    score: {
                        ...state.score,
                        skipped: state.score.skipped + 1,
                    },
                })),

            completeQuiz: () =>
                set((state) => {
                    const newSession: QuizSession = {
                        id: Date.now().toString(),
                        date: new Date().toISOString(),
                        score: state.score,
                        difficulty: state.settings.difficulty,
                        categories: state.settings.categories,
                        reviewItems: state.reviewItems,
                        timeLimit: state.settings.timeLimit
                            ? state.settings.timeLimit
                            : new Date().getTime() - state.timer.totalTime,
                    };

                    return {
                        isQuizComplete: true,
                        quizSessions: [
                            newSession,
                            ...state.quizSessions.slice(0, 19),
                        ], // Keep last 20 sessions
                    };
                }),

            startNewQuiz: (questions) =>
                set({
                    questions,
                    currentQuestionIndex: 0,
                    progress: {
                        current: 1,
                        total: questions.length,
                    },
                    score: {
                        correct: 0,
                        incorrect: 0,
                        skipped: 0,
                        total: questions.length,
                        percentage: 0,
                        timeSpent: 0,
                    },
                    reviewItems: [],
                    isQuizComplete: false,
                    isReviewMode: false,
                    timer: {
                        isActive: false,
                        timeRemaining: 0,
                        totalTime: 0,
                    },
                }),

            updateSettings: (newSettings) =>
                set((state) => ({
                    settings: {
                        ...state.settings,
                        ...newSettings,
                    },
                })),

            startTimer: (duration) =>
                set({
                    timer: {
                        isActive: true,
                        timeRemaining: duration,
                        totalTime: duration,
                    },
                }),

            pauseTimer: () =>
                set((state) => ({
                    timer: {
                        ...state.timer,
                        isActive: false,
                    },
                })),

            resumeTimer: () =>
                set((state) => ({
                    timer: {
                        ...state.timer,
                        isActive: true,
                    },
                })),

            stopTimer: () =>
                set({
                    timer: {
                        isActive: false,
                        timeRemaining: 0,
                        totalTime: 0,
                    },
                }),

            decrementTimer: () =>
                set((state) => {
                    if (
                        !state.timer.isActive ||
                        state.timer.timeRemaining <= 0
                    ) {
                        return state;
                    }

                    return {
                        timer: {
                            ...state.timer,
                            timeRemaining: state.timer.timeRemaining - 1,
                        },
                    };
                }),

            setReviewMode: (isReviewMode) => set({ isReviewMode }),

            clearHistory: () =>
                set({
                    quizSessions: [],
                }),
        }),
        {
            name: "quiz-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
