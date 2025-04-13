import { Pressable, PressableProps, Text, ViewStyle } from "react-native";
import React from "react";

export function Button({ children, style, ...props }: PressableProps) {
    return (
        <Pressable
            style={[
                {
                    padding: 16,
                    borderRadius: 14,
                    width: "100%",
                },
                style as ViewStyle,
            ]}
            {...props}
        >
            {typeof children === "string" ? (
                <Text
                    style={{
                        textAlign: "center",
                        fontWeight: "500",
                        color: "#fff",
                    }}
                >
                    {children}
                </Text>
            ) : (
                children
            )}
        </Pressable>
    );
}
