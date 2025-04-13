import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import SocialLoginButton from "@/components/SocialLoginButton";
import { LinearGradient } from "expo-linear-gradient";

export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();

const AuthScreen = () => {
    useWarmUpBrowser();
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#0F172A", "#0c1120"]}
                style={styles.background}
            />

            <View
                style={[
                    styles.content,
                    {
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom + 20,
                    },
                ]}
            >
                <View style={styles.logoContainer}>
                    <View style={styles.logoBackground}>
                        <Image
                            source={require("@/assets/images/logo.png")}
                            style={styles.logo}
                        />
                    </View>
                    <Text style={styles.appName}>WordPacker</Text>
                    <Text style={styles.tagline}>
                        Your ultimate word game companion
                    </Text>
                </View>

                <View style={styles.socialButtonsContainer}>
                    <SocialLoginButton strategy="google" />
                    <SocialLoginButton strategy="apple" />
                    <SocialLoginButton strategy="facebook" />

                    <View style={styles.termsContainer}>
                        <Text style={styles.termsText}>
                            By continuing, you agree to our{" "}
                            <Text style={styles.termsLink}>
                                Terms of Service
                            </Text>{" "}
                            and{" "}
                            <Text style={styles.termsLink}>Privacy Policy</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AuthScreen;

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
    content: {
        flex: 1,
        padding: 24,
        justifyContent: "space-between",
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 60,
    },
    logoBackground: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#4CAF50",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    logo: {
        width: 70,
        height: 70,
    },
    appName: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginTop: 20,
        letterSpacing: 0.5,
    },
    tagline: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.7)",
        marginTop: 8,
    },
    socialButtonsContainer: {
        width: "100%",
        gap: 14,
    },
    termsContainer: {
        marginTop: 24,
        alignItems: "center",
    },
    termsText: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.5)",
        textAlign: "center",
        lineHeight: 18,
    },
    termsLink: {
        color: "#4CAF50",
        fontWeight: "500",
    },
});
