import React from "react";
import { Link, Redirect, Tabs } from "expo-router";
import {
    Home,
    BookOpen,
    Settings,
    Plus,
    Brain,
    Pen,
} from "lucide-react-native";
import { StyleSheet, Pressable } from "react-native";
import { colors } from "@/constants/colors";
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
} from "react-native-reanimated";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";

export default function TabLayout() {
    const { user } = useUser();
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        return <Redirect href="/auth" />;
    }

    if (isSignedIn && user?.unsafeMetadata?.onboarding_completed !== true) {
        return <Redirect href="/auth/complete-your-account" />;
    }
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: styles.tabBar,
                headerStyle: styles.header,
                headerTintColor: colors.text,
                headerTitleStyle: styles.headerTitle,
                tabBarShowLabel: false,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarButton: (props) => <TabButton {...props} />,
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "WordPecker",
                    headerLeft: () => (
                        <Link href="/profile" style={{ marginLeft: 10 }}>
                            <Image
                                source={{ uri: user?.imageUrl }}
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 18,
                                }}
                            />
                        </Link>
                    ),
                    headerRight: () => (
                        <Link href="/create-list" style={{ marginRight: 10 }}>
                            <Plus />
                        </Link>
                    ),
                    tabBarIcon: ({ color }) => <Home size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: "Library",
                    tabBarIcon: ({ color }) => (
                        <BookOpen size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="practice"
                options={{
                    title: "Practice",
                    tabBarIcon: ({ color }) => <Pen size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="quiz"
                options={{
                    title: "Quiz",
                    tabBarIcon: ({ color }) => (
                        <Brain size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => (
                        <Settings size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

function TabButton(props: any) {
    const { accessibilityState, onPress, children } = props;
    const isSelected = accessibilityState.selected;
    const scale = useSharedValue(1);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    React.useEffect(() => {
        if (isSelected) {
            scale.value = withTiming(1.1, { duration: 200 });
        } else {
            scale.value = withTiming(1, { duration: 200 });
        }
    }, [isSelected]);

    return (
        <Pressable
            onPress={onPress}
            style={styles.tabButton}
            android_ripple={{
                color: colors.primary,
                borderless: true,
                radius: 28,
            }}
        >
            <Animated.View
                style={[
                    styles.tabButtonInner,
                    animatedStyles,
                    isSelected && styles.tabButtonActive,
                ]}
            >
                {children}
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.cardBackground,
        backdropFilter: "blur(10px)",
        borderTopWidth: 0,
        width: "100%",
        alignSelf: "center",
        height: 70,
        padding: 5,
    },
    header: {
        backgroundColor: colors.background,
        shadowColor: "transparent",
        elevation: 0,
    },
    headerTitle: {
        fontWeight: "700",
        fontSize: 18,
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 4,
    },
    tabButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    tabButtonInner: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    tabButtonActive: {
        color: `${colors.primary}10`,
    },
});
