import React, { useState } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { ListDetailsHeader } from "@/components/listDetails/ListDetailsHeader";
import { WordsList } from "@/components/listDetails/WordsList";
import { ListActions } from "@/components/listDetails/ListActions";
import { ProgressStats } from "@/components/listDetails/ProgressStats";
import { useListDetails } from "@/hooks/useListDetails";
import { EmptyWordsList } from "@/components/listDetails/EmptyWordsList";
import { AddWordModal } from "@/components/listDetails/AddWordModal";
import { CameraCapture } from "@/components/camera/CameraCapture";

export default function ListDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const {
        list,
        isLoading,
        progress,
        showAddWordModal,
        showCameraCapture,
        handleEditList,
        handleDeleteList,
        handleAddWord,
        handleAddWordSubmit,
        handleEditWord,
        handleDeleteWord,
        handleToggleWordStatus,
        handleStartLearning,
        handleStartQuiz,
        handleCaptureWords,
        setShowAddWordModal,
        setShowCameraCapture,
    } = useListDetails(id);

    const handleBack = () => {
        router.back();
    };

    if (isLoading || !list) {
        return (
            <SafeAreaView style={styles.loadingContainer} edges={["bottom"]}>
                <Stack.Screen
                    options={{
                        title: "List Details",
                        headerStyle: styles.header,
                        headerTitleStyle: styles.headerTitle,
                        headerShadowVisible: false,
                    }}
                />
                <ActivityIndicator size="large" color={colors.primary} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    headerBackTitle: "Back",
                    headerBackTitleStyle: styles.backTitle,
                    title: list.name,
                    headerTitleStyle: styles.headerTitle,
                    headerShadowVisible: false,
                }}
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <ListDetailsHeader
                    list={list}
                    onEdit={handleEditList}
                    onDelete={handleDeleteList}
                />

                <ProgressStats progress={progress} />

                <ListActions
                    onStartLearning={handleStartLearning}
                    onStartQuiz={handleStartQuiz}
                    onAddWord={handleAddWord}
                    onCaptureWords={handleCaptureWords}
                />

                {list.words.length > 0 ? (
                    <WordsList
                        words={list.words}
                        onEdit={handleEditWord}
                        onDelete={handleDeleteWord}
                        onToggleStatus={handleToggleWordStatus}
                    />
                ) : (
                    <EmptyWordsList onAddWord={handleAddWord} />
                )}
            </ScrollView>

            {showAddWordModal && (
                <AddWordModal
                    listId={list.id}
                    language={list.language}
                    onSubmit={handleAddWordSubmit}
                    onClose={() => setShowAddWordModal(false)}
                />
            )}

            {showCameraCapture && (
                <CameraCapture
                    listId={list.id}
                    onClose={() => setShowCameraCapture(false)}
                    onSaveWords={handleAddWordSubmit}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    header: {
        backgroundColor: colors.background,
    },
    headerTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "600",
    },
    backTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "600",
    },
});
