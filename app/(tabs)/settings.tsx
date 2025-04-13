import React, { useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    View,
    Switch,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { useAuth } from "@clerk/clerk-react";

const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    rightElement,
}: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
}) => {
    return (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <View style={styles.settingIconContainer}>
                <Ionicons name={icon as any} size={22} color={colors.primary} />
            </View>
            <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>{title}</Text>
                {subtitle && (
                    <Text style={styles.settingSubtitle}>{subtitle}</Text>
                )}
            </View>
            <View style={styles.settingRightElement}>
                {rightElement || (
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={colors.textSecondary}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
};

const SettingSection = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <View style={styles.settingSection}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.sectionContent}>{children}</View>
        </View>
    );
};

export default function SettingsScreen() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const router = useRouter();
    const [notifications, setNotifications] = useState(true);
    const [dailyReminder, setDailyReminder] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [soundEffects, setSoundEffects] = useState(true);

    const handleSignOut = async () => {
        await signOut();
        router.replace("/auth");
    };

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    title: "Settings",
                    headerStyle: styles.header,
                    headerTitleStyle: styles.headerTitle,
                    headerShadowVisible: false,
                }}
            />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: user?.imageUrl }}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 40,
                            }}
                        />
                    </View>
                    <Text style={styles.profileName}>{user?.fullName}</Text>
                    <Text style={styles.profileEmail}>
                        {user?.emailAddresses[0]?.emailAddress}
                    </Text>
                    <TouchableOpacity style={styles.editProfileButton}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* App Preferences */}
                <SettingSection title="App Preferences">
                    <SettingItem
                        icon="moon-outline"
                        title="Dark Mode"
                        rightElement={
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                trackColor={{
                                    false: colors.border,
                                    true: colors.primary,
                                }}
                                thumbColor={colors.text}
                            />
                        }
                    />
                    <SettingItem
                        icon="volume-high-outline"
                        title="Sound Effects"
                        rightElement={
                            <Switch
                                value={soundEffects}
                                onValueChange={setSoundEffects}
                                trackColor={{
                                    false: colors.border,
                                    true: colors.primary,
                                }}
                                thumbColor={colors.text}
                            />
                        }
                    />
                    <SettingItem
                        icon="language-outline"
                        title="App Language"
                        subtitle="English"
                        onPress={() => router.push("/settings/language")}
                    />
                    <SettingItem
                        icon="refresh-outline"
                        title="Daily Word Limit"
                        subtitle="20 words"
                        onPress={() => router.push("/settings/word-limit")}
                    />
                </SettingSection>

                {/* Notifications */}
                <SettingSection title="Notifications">
                    <SettingItem
                        icon="notifications-outline"
                        title="Push Notifications"
                        rightElement={
                            <Switch
                                value={notifications}
                                onValueChange={setNotifications}
                                trackColor={{
                                    false: colors.border,
                                    true: colors.primary,
                                }}
                                thumbColor={colors.text}
                            />
                        }
                    />
                    <SettingItem
                        icon="alarm-outline"
                        title="Daily Reminder"
                        subtitle="Enable daily study reminders"
                        rightElement={
                            <Switch
                                value={dailyReminder}
                                onValueChange={setDailyReminder}
                                trackColor={{
                                    false: colors.border,
                                    true: colors.primary,
                                }}
                                thumbColor={colors.text}
                                disabled={!notifications}
                            />
                        }
                    />
                    <SettingItem
                        icon="time-outline"
                        title="Reminder Time"
                        subtitle="8:00 PM"
                        onPress={() => router.push("/settings/reminder-time")}
                    />
                </SettingSection>

                {/* Data & Storage */}
                <SettingSection title="Data & Storage">
                    <SettingItem
                        icon="cloud-download-outline"
                        title="Download Word Lists"
                        subtitle="Save lists for offline use"
                        onPress={() => router.push("/settings/download")}
                    />
                    <SettingItem
                        icon="trash-outline"
                        title="Clear Cache"
                        subtitle="Free up storage space"
                        onPress={() =>
                            Alert.alert(
                                "Clear Cache",
                                "This will clear temporary files. Your word lists and progress will not be affected.",
                                [
                                    { text: "Cancel", style: "cancel" },
                                    {
                                        text: "Clear",
                                        style: "destructive",
                                        onPress: () =>
                                            console.log("Cache cleared"),
                                    },
                                ]
                            )
                        }
                    />
                    <SettingItem
                        icon="analytics-outline"
                        title="Data Usage"
                        subtitle="Manage how the app uses data"
                        onPress={() => router.push("/settings/data-usage")}
                    />
                </SettingSection>

                {/* Account Settings */}
                <SettingSection title="Account">
                    <SettingItem
                        icon="person-outline"
                        title="Account Information"
                        onPress={() => router.push("/settings/account")}
                    />
                    <SettingItem
                        icon="lock-closed-outline"
                        title="Change Password"
                        onPress={() => router.push("/settings/password")}
                    />
                    <SettingItem
                        icon="sync-outline"
                        title="Sync Settings"
                        subtitle="Manage data synchronization"
                        onPress={() => router.push("/settings/sync")}
                    />
                </SettingSection>

                {/* Help & Support */}
                <SettingSection title="Help & Support">
                    <SettingItem
                        icon="help-circle-outline"
                        title="FAQs"
                        onPress={() => router.push("/settings/faqs")}
                    />
                    <SettingItem
                        icon="mail-outline"
                        title="Contact Support"
                        onPress={() => router.push("/settings/support")}
                    />
                    <SettingItem
                        icon="information-circle-outline"
                        title="About WordPecker"
                        subtitle="Version 1.0.0"
                        onPress={() => router.push("/settings/about")}
                    />
                </SettingSection>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleSignOut}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={20}
                        color={colors.error}
                    />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        WordPecker Mobile © 2025
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push("/settings/privacy")}
                    >
                        <Text style={styles.footerLink}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push("/settings/terms")}
                    >
                        <Text style={styles.footerLink}>Terms of Service</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    header: {
        backgroundColor: colors.background,
    },
    headerTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "600",
    },
    profileSection: {
        alignItems: "center",
        padding: 24,
        marginBottom: 16,
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
    },
    profileImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    profileInitials: {
        color: colors.text,
        fontSize: 28,
        fontWeight: "bold",
    },
    profileName: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 4,
    },
    profileEmail: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 16,
    },
    editProfileButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 20,
    },
    editProfileText: {
        color: colors.primary,
        fontWeight: "500",
    },
    settingSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        marginLeft: 8,
    },
    sectionContent: {
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        overflow: "hidden",
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    settingIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: `${colors.primary}20`,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "500",
    },
    settingSubtitle: {
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: 2,
    },
    settingRightElement: {
        marginLeft: 8,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: `${colors.error}20`,
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
    },
    logoutText: {
        color: colors.error,
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 8,
    },
    footer: {
        alignItems: "center",
        marginBottom: 24,
    },
    footerText: {
        color: colors.textSecondary,
        fontSize: 12,
        marginBottom: 8,
    },
    footerLink: {
        color: colors.primary,
        fontSize: 12,
        marginBottom: 4,
    },
});
