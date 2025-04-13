import { useOAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as Linking from "expo-linking";
import React, { useState } from "react";

const SocialLoginButton = ({
    strategy,
}: {
    strategy: "facebook" | "google" | "apple";
}) => {
    const getStrategy = () => {
        if (strategy === "facebook") {
            return "oauth_facebook";
        } else if (strategy === "google") {
            return "oauth_google";
        } else if (strategy === "apple") {
            return "oauth_apple";
        }
        return "oauth_facebook";
    };

    const { startOAuthFlow } = useOAuth({ strategy: getStrategy() });
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const buttonText = () => {
        if (isLoading) {
            return "Loading...";
        }

        if (strategy === "facebook") {
            return "Continue with Facebook";
        } else if (strategy === "google") {
            return "Continue with Google";
        } else if (strategy === "apple") {
            return "Continue with Apple";
        }
    };

    const buttonIcon = () => {
        if (strategy === "facebook") {
            return <Ionicons name="logo-facebook" size={22} color="#FFFFFF" />;
        } else if (strategy === "google") {
            return <Ionicons name="logo-google" size={22} color="#FFFFFF" />;
        } else if (strategy === "apple") {
            return <Ionicons name="logo-apple" size={22} color="#FFFFFF" />;
        }
    };

    const buttonStyle = () => {
        if (strategy === "facebook") {
            return [styles.container, styles.facebookButton];
        } else if (strategy === "google") {
            return [styles.container, styles.googleButton];
        } else if (strategy === "apple") {
            return [styles.container, styles.appleButton];
        }
        return [styles.container];
    };

    const onSocialLoginPress = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const { createdSessionId, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL("/dashboard", {
                    scheme: "myapp",
                }),
            });

            if (createdSessionId) {
                console.log("Session created", createdSessionId);
                setActive!({ session: createdSessionId });
                await user?.reload();
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <TouchableOpacity
            style={buttonStyle()}
            onPress={onSocialLoginPress}
            disabled={isLoading}
            activeOpacity={0.8}
        >
            <View style={styles.iconContainer}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                    buttonIcon()
                )}
            </View>
            <Text style={styles.buttonText}>{buttonText()}</Text>
            <View style={styles.spacer} />
        </TouchableOpacity>
    );
};

export default SocialLoginButton;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 56,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    googleButton: {
        backgroundColor: "#4CAF50",
    },
    facebookButton: {
        backgroundColor: "#4CAF50",
    },
    appleButton: {
        backgroundColor: "#4CAF50",
    },
    iconContainer: {
        width: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    spacer: {
        width: 50,
    },
});
