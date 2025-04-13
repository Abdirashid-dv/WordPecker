import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { set, useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import TextInput from "@/components/Forms/TextInput";
import RadioButtonInput from "@/components/Forms/RadioButtonInput";

const CompleteYourAccountScreen = () => {
    const { user, isLoaded } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const { control, handleSubmit, setError, setValue } = useForm({
        defaultValues: {
            full_name: "",
            username: "",
            gender: "",
            native_language: "",
            target_language: "English",
            learning_goal: "",
        },
    });

    const onSubmit = async (data: any) => {
        const {
            full_name,
            username,
            gender,
            native_language,
            target_language,
            learning_goal,
        } = data;

        try {
            setIsLoading(true);
            await user?.update({
                username: username,
                firstName: full_name.split(" ")[0],
                lastName: full_name.split(" ")[1],
                unsafeMetadata: {
                    gender,
                    native_language,
                    target_language,
                    learning_goal,
                    onboarding_completed: true,
                },
            });

            await user?.reload();

            return router.push("/(tabs)");
        } catch (error: any) {
            console.log("Error updating user", error);
            if (
                error.message === "That username is taken. Please try another."
            ) {
                return setError("username", {
                    message: "Username is already taken",
                });
            }

            return setError("full_name", { message: "An error occurred" });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        if (!user) {
            return;
        }

        setValue("full_name", user?.fullName || "");
        setValue("username", user?.username || "");
        setValue("gender", String(user?.unsafeMetadata?.gender) || "");
    }, [isLoaded, user]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#0F172A", "#0c1120"]}
                style={styles.background}
            />

            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingTop: insets.top + 20,
                        paddingBottom: insets.bottom + 20,
                    },
                ]}
            >
                <View style={styles.headingContainer}>
                    <View style={styles.titleRow}>
                        <Ionicons
                            name="person-circle-outline"
                            size={30}
                            color="#4CAF50"
                        />
                        <Text style={styles.title}>Complete your profile</Text>
                    </View>
                    <Text style={styles.description}>
                        Join thousands of developers worldwide by setting up
                        your account
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <TextInput
                            control={control}
                            placeholder="Enter your full name"
                            required
                            name="full_name"
                            customStyles={styles.customTextInput}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Username</Text>
                        <TextInput
                            control={control}
                            placeholder="Choose a unique username"
                            required
                            name="username"
                            customStyles={styles.customTextInput}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Gender</Text>
                        <RadioButtonInput
                            control={control}
                            placeholder="Select your gender"
                            required
                            name="gender"
                            options={[
                                { label: "Male", value: "male" },
                                { label: "Female", value: "female" },
                                { label: "Other", value: "other" },
                            ]}
                            customStyles={styles.customRadioInput}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Native Language</Text>
                        <RadioButtonInput
                            control={control}
                            placeholder="Select your native language"
                            required
                            name="native_language"
                            options={[
                                { label: "English", value: "english" },
                                { label: "Spanish", value: "spanish" },
                                { label: "French", value: "french" },
                                { label: "Other", value: "other" },
                            ]}
                            customStyles={styles.customRadioInput}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Target Language</Text>
                        <RadioButtonInput
                            control={control}
                            placeholder="Select language you want to learn"
                            required
                            name="target_language"
                            options={[
                                { label: "English", value: "english" },
                                { label: "Spanish", value: "spanish" },
                                { label: "French", value: "french" },
                                { label: "German", value: "german" },
                                { label: "Other", value: "other" },
                            ]}
                            customStyles={styles.customRadioInput}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Learning Goal</Text>
                        <RadioButtonInput
                            control={control}
                            placeholder="Select your learning schedule"
                            required
                            name="learning_goal"
                            options={[
                                {
                                    label: "Daily Practice (10 mins)",
                                    value: "daily_short",
                                },
                                {
                                    label: "Casual Learning (weekly)",
                                    value: "weekly",
                                },
                                {
                                    label: "Intensive Study (30 mins daily)",
                                    value: "daily_intensive",
                                },
                            ]}
                            customStyles={styles.customRadioInput}
                        />
                    </View>
                </View>
            </ScrollView>

            <View
                style={[
                    styles.buttonContainer,
                    { paddingBottom: insets.bottom + 20 },
                ]}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Ionicons
                            name="checkmark-circle"
                            size={20}
                            color="white"
                        />
                    )}
                    <Text style={styles.buttonText}>
                        {isLoading ? "Updating..." : "Complete Profile"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CompleteYourAccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    headingContainer: {
        width: "100%",
        marginBottom: 30,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginLeft: 10,
    },
    description: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.7)",
        lineHeight: 22,
    },
    formContainer: {
        width: "100%",
        gap: 24,
    },
    inputWrapper: {
        width: "100%",
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
        marginBottom: 8,
    },
    customTextInput: {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 12,
        padding: 16,
        color: "white",
        fontSize: 16,
    },
    customRadioInput: {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 12,
        color: "white",
    },
    buttonContainer: {
        padding: 24,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        borderTopWidth: 1,
        borderTopColor: "rgba(255, 255, 255, 0.05)",
    },
    button: {
        width: "100%",
        backgroundColor: "#4CAF50",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
