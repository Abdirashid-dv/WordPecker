import { useState, useEffect, useCallback, useRef } from "react";
import { useLearningStore } from "@/stores/learningStore";
import { getQuestions } from "@/services/learningService";
import { Question, QuestionType } from "@/types/learning";
import { generateFeedbackMessage } from "@/utils/feedbackUtils";
import { FEEDBACK_DISPLAY_TIME } from "@/constants/learning";

export const useLearningMode = () => {
    const {
        questions,
        currentQuestionIndex,
        progress,
        streak,
        currentSession,
        settings,
        setQuestions,
        setCurrentQuestionIndex,
        incrementProgress,
        incrementStreak,
        resetStreak,
        updateHighestStreak,
        incrementCorrectAnswers,
        completeSession,
        startNewSession,
        updateSessionTime,
    } = useLearningStore();

    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState({
        visible: false,
        isCorrect: false,
        message: "",
        correctAnswer: "",
        explanation: "",
    });

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<Date>(new Date());

    // Start session timer
    useEffect(() => {
        startTimeRef.current = new Date();

        // Update session time every second
        sessionTimerRef.current = setInterval(() => {
            const currentTime = new Date();
            const elapsedSeconds = Math.floor(
                (currentTime.getTime() - startTimeRef.current.getTime()) / 1000
            );
            updateSessionTime(elapsedSeconds);
        }, 1000);

        return () => {
            if (sessionTimerRef.current) {
                clearInterval(sessionTimerRef.current);
            }
        };
    }, []);

    // Fetch questions when the hook is first used
    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const fetchedQuestions = await getQuestions(
                    settings.selectedExerciseTypes,
                    settings.questionsPerSession
                );
                setQuestions(fetchedQuestions);
                startNewSession(
                    fetchedQuestions.length,
                    settings.selectedExerciseTypes
                );
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const currentQuestion = questions[currentQuestionIndex];
    const isSessionComplete = currentQuestionIndex >= questions.length;

    const handleSelectAnswer = useCallback(
        (answerId: string) => {
            if (!currentQuestion || feedback.visible) return;

            const isCorrect = checkAnswer(currentQuestion, answerId);

            // Update stats based on answer correctness
            if (isCorrect) {
                incrementStreak();
                updateHighestStreak();
                incrementCorrectAnswers();
            } else {
                resetStreak();
            }

            // Get correct answer text for feedback
            const correctAnswer = getCorrectAnswerText(currentQuestion);

            // Show feedback
            setFeedback({
                visible: true,
                isCorrect,
                message: generateFeedbackMessage(isCorrect),
                correctAnswer: isCorrect ? "" : correctAnswer,
                explanation: currentQuestion.explanation || "",
            });

            // Auto-advance if enabled
            if (settings.autoAdvance) {
                timerRef.current = setTimeout(() => {
                    handleNextQuestion();
                }, settings.autoAdvanceDelay);
            }
        },
        [currentQuestion, feedback.visible, settings]
    );

    const handleNextQuestion = useCallback(() => {
        // Clear any existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        setFeedback({
            visible: false,
            isCorrect: false,
            message: "",
            correctAnswer: "",
            explanation: "",
        });

        // Move to next question
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        incrementProgress();

        // Check if session is complete
        if (nextIndex >= questions.length) {
            completeSession();

            // Clear session timer
            if (sessionTimerRef.current) {
                clearInterval(sessionTimerRef.current);
            }
        }
    }, [currentQuestionIndex, questions.length]);

    const handleRestartSession = useCallback(() => {
        // Reset timer
        startTimeRef.current = new Date();

        // Restart session timer if it was cleared
        if (!sessionTimerRef.current) {
            sessionTimerRef.current = setInterval(() => {
                const currentTime = new Date();
                const elapsedSeconds = Math.floor(
                    (currentTime.getTime() - startTimeRef.current.getTime()) /
                        1000
                );
                updateSessionTime(elapsedSeconds);
            }, 1000);
        }

        // Fetch new questions
        const fetchNewQuestions = async () => {
            setIsLoading(true);
            try {
                const fetchedQuestions = await getQuestions(
                    settings.selectedExerciseTypes,
                    settings.questionsPerSession
                );
                setQuestions(fetchedQuestions);
                setCurrentQuestionIndex(0);
                startNewSession(
                    fetchedQuestions.length,
                    settings.selectedExerciseTypes
                );
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setIsLoading(false);
            }
        };

        fetchNewQuestions();
    }, [settings]);

    return {
        currentQuestion,
        progress,
        streak,
        isSessionComplete,
        feedback,
        isLoading,
        settings,
        handleSelectAnswer,
        handleNextQuestion,
        handleRestartSession,
    };
};

// Helper function to check if an answer is correct based on question type
const checkAnswer = (question: Question, answerId: string): boolean => {
    switch (question.type) {
        case QuestionType.MULTIPLE_CHOICE:
        case QuestionType.TRUE_FALSE:
        case QuestionType.FILL_IN_BLANK:
            return answerId === question.correctOptionId;

        case QuestionType.MATCHING:
            // For matching, the correctOptionId might be a comma-separated list
            const selectedIds = answerId.split(",");
            const correctIds = question.correctOptionId.split(",");

            // Check if all selected IDs are in the correct IDs list and counts match
            return (
                selectedIds.length === correctIds.length &&
                selectedIds.every((id) => correctIds.includes(id))
            );

        default:
            return false;
    }
};

// Helper function to get the correct answer text based on question type
const getCorrectAnswerText = (question: Question): string => {
    switch (question.type) {
        case QuestionType.MULTIPLE_CHOICE:
            return (
                question.options.find(
                    (option) => option.id === question.correctOptionId
                )?.text || ""
            );

        case QuestionType.TRUE_FALSE:
            return question.isTrue ? "True" : "False";

        case QuestionType.FILL_IN_BLANK:
            return question.blanks?.[0] || "";

        case QuestionType.MATCHING:
            // For matching, return a formatted string of correct pairs
            if (question.matchPairs) {
                return question.matchPairs
                    .map((pair) => `${pair.left} → ${pair.right}`)
                    .join(", ");
            }
            return "";

        default:
            return "";
    }
};
