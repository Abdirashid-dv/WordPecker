export const colors = {
    primary: "#4CAF50", // Green
    accent: "#2196F3", // Blue
    highlight: "#FFC107", // Amber
    background: "#0F172A", // Dark Blue
    cardBackground: "#1E293B", // Slightly lighter dark blue
    text: "#FFFFFF", // White
    textSecondary: "#94A3B8", // Light gray
    border: "#334155", // Medium gray
    success: "#10B981", // Green
    error: "#EF4444", // Red
    warning: "#F59E0B", // Orange
    progressBackground: "#334155",
};

export const COLORS = {
    primary: "#4CAF50", // Green
    accent: "#2196F3", // Blue
    highlight: "#FFC107", // Amber
    background: "#0F172A", // Dark Blue
    surface: "#1E293B", // Slightly lighter dark blue for cards
    text: "#FFFFFF", // White
    textSecondary: "#94A3B8", // Light gray for secondary text
    error: "#EF4444", // Red for errors
    success: "#10B981", // Green for success
    warning: "#F59E0B", // Orange for warnings
    info: "#3B82F6", // Blue for info
    border: "#334155", // Border color
    disabled: "#64748B", // Disabled state
    progressBackground: "#1E293B", // Background for progress bars
};

export default {
    light: {
        text: "#000",
        background: "#fff",
        tint: "#2f95dc",
        tabIconDefault: "#ccc",
        tabIconSelected: "#2f95dc",
    },
    dark: {
        text: COLORS.text,
        background: COLORS.background,
        tint: COLORS.primary,
        tabIconDefault: COLORS.textSecondary,
        tabIconSelected: COLORS.primary,
    },
};
