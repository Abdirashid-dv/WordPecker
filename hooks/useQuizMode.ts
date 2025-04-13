import { useState, useEffect, useCallback, useRef } from "react";
import { useQuizStore } from "@/stores/quizStore";
import { getQuizQuestions } from "@/services/quizService";
import { QuizQuestion, QuizReview } from "@/types/quiz";
import { TIME_LIMITS } from "@/constants/quiz";

export const useQuizMode = () => {
    const {
        questions,
        currentQuestionIndex,
        progress,
        score,
        reviewItems,
        settings,
        timer,
        isQuizComplete,
        isReviewMode,
        setQuestions,
        setCurrentQuestionIndex,
        incrementProgress,
        recordAnswer,
        skipQuestion,
        completeQuiz,
        startNewQuiz,
        startTimer,
        pauseTimer,
        resumeTimer,
        stopTimer,
        decrementTimer,
        setReviewMode,
    } = useQuizStore();

    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState({
        visible: false,
        isCorrect: false,
        message: "",
        correctAnswer: "",
        explanation: "",
    });

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
    const questionStartTimeRef = useRef<Date>(new Date());

    // Initialize timer for each question
    useEffect(() => {
        if (
            settings.timeLimit &&
            !isQuizComplete &&
            !isReviewMode &&
            questions.length > 0
        ) {
            questionStartTimeRef.current = new Date();
            startTimer(settings.timeLimit);

            // Set up timer interval
            timerRef.current = setInterval(() => {
                decrementTimer();
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [currentQuestionIndex, isQuizComplete, isReviewMode, questions.length]);

    // Check if timer has expired
    useEffect(() => {
        if (timer.timeRemaining === 0 && timer.isActive) {
            handleTimeUp();
        }
    }, [timer.timeRemaining, timer.isActive]);

    // Fetch questions when the hook is first used
    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const fetchedQuestions = await getQuizQuestions(
                    settings.difficulty,
                    settings.categories,
                    settings.questionsPerQuiz
                );
                setQuestions(fetchedQuestions);
                startNewQuiz(fetchedQuestions);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching quiz questions:", error);
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const currentQuestion = questions[currentQuestionIndex];

    const handleSelectAnswer = useCallback(
        (answerId: string) => {
            if (!currentQuestion || feedback.visible) return;

            // Calculate time spent on this question
            const currentTime = new Date();
            const timeSpent = Math.floor(
                (currentTime.getTime() -
                    questionStartTimeRef.current.getTime()) /
                    1000
            );

            // Stop the timer
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            stopTimer();

            // Record the answer
            recordAnswer(currentQuestion.id, answerId, timeSpent);

            // Check if answer is correct
            const isCorrect = answerId === currentQuestion.correctOptionId;

            // Get correct answer text for feedback
            const correctOption = currentQuestion.options.find(
                (opt) => opt.id === currentQuestion.correctOptionId
            );

            // Show feedback
            setFeedback({
                visible: true,
                isCorrect,
                message: isCorrect ? "Correct!" : "Incorrect!",
                correctAnswer: isCorrect ? "" : correctOption?.text || "",
                explanation: currentQuestion.explanation || "",
            });

            // Auto-advance if enabled
            if (settings.autoAdvance) {
                questionTimerRef.current = setTimeout(() => {
                    handleNextQuestion();
                }, 2000);
            }
        },
        [currentQuestion, feedback.visible, settings]
    );

    const handleSkipQuestion = useCallback(() => {
        if (feedback.visible) return;

        // Calculate time spent on this question
        const currentTime = new Date();
        const timeSpent = Math.floor(
            (currentTime.getTime() - questionStartTimeRef.current.getTime()) /
                1000
        );

        // Stop the timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        stopTimer();

        // Record the skip
        skipQuestion();

        // Get correct answer text for feedback
        const correctOption = currentQuestion.options.find(
            (opt) => opt.id === currentQuestion.correctOptionId
        );

        // Show feedback
        setFeedback({
            visible: true,
            isCorrect: false,
            message: "Question Skipped",
            correctAnswer: correctOption?.text || "",
            explanation: currentQuestion.explanation || "",
        });

        // Auto-advance
        questionTimerRef.current = setTimeout(() => {
            handleNextQuestion();
        }, 2000);
    }, [currentQuestion, feedback.visible]);

    const handleTimeUp = useCallback(() => {
        if (feedback.visible) return;

        // Stop the timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        stopTimer();

        // Record the timeout as incorrect
        recordAnswer(currentQuestion.id, "", settings.timeLimit || 0);

        // Get correct answer text for feedback
        const correctOption = currentQuestion.options.find(
            (opt) => opt.id === currentQuestion.correctOptionId
        );

        // Show feedback
        setFeedback({
            visible: true,
            isCorrect: false,
            message: "Time's Up!",
            correctAnswer: correctOption?.text || "",
            explanation: currentQuestion.explanation || "",
        });

        // Auto-advance
        questionTimerRef.current = setTimeout(() => {
            handleNextQuestion();
        }, 2000);
    }, [currentQuestion, feedback.visible, settings.timeLimit]);

    const handleNextQuestion = useCallback(() => {
        // Clear any existing timer
        if (questionTimerRef.current) {
            clearTimeout(questionTimerRef.current);
            questionTimerRef.current = null;
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

        // Check if quiz is complete
        if (nextIndex >= questions.length) {
            completeQuiz();
        } else {
            setCurrentQuestionIndex(nextIndex);
            questionStartTimeRef.current = new Date();

            // Start timer for next question if time limit is set
            if (settings.timeLimit) {
                startTimer(settings.timeLimit);

                timerRef.current = setInterval(() => {
                    decrementTimer();
                }, 1000);
            }
        }
    }, [currentQuestionIndex, questions.length, settings.timeLimit]);

    const handleRestartQuiz = useCallback(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const fetchedQuestions = await getQuizQuestions(
                    settings.difficulty,
                    settings.categories,
                    settings.questionsPerQuiz
                );
                startNewQuiz(fetchedQuestions);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching quiz questions:", error);
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [settings]);

    const handleViewReview = useCallback(() => {
        setReviewMode(true);
    }, []);

    const handleExitReview = useCallback(() => {
        setReviewMode(false);
    }, []);

    return {
        currentQuestion,
        progress,
        score,
        reviewItems,
        timer,
        isQuizComplete,
        isReviewMode,
        feedback,
        isLoading,
        settings,
        handleSelectAnswer,
        handleSkipQuestion,
        handleNextQuestion,
        handleRestartQuiz,
        handleViewReview,
        handleExitReview,
    };
};
