import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Control, Controller } from "react-hook-form";

interface Option {
    label: string;
    value: string;
}

interface RadioButtonInputProps {
    control: Control<any>;
    name: string;
    placeholder?: string;
    label?: string;
    required?: boolean;
    options: Option[];
    customStyles?: object;
}

const RadioButtonInput = ({
    control,
    name,
    placeholder,
    label,
    required,
    options,
    customStyles,
}: RadioButtonInputProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: required }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    <View
                        style={[
                            styles.radioGroup,
                            error && styles.errorContainer,
                        ]}
                    >
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.radioButton,
                                    value === option.value &&
                                        styles.radioButtonSelected,
                                    customStyles,
                                ]}
                                onPress={() => onChange(option.value)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.radioButtonInner}>
                                    <View
                                        style={[
                                            styles.radioCircle,
                                            value === option.value &&
                                                styles.radioCircleSelected,
                                        ]}
                                    >
                                        {value === option.value && (
                                            <View
                                                style={styles.radioCircleDot}
                                            />
                                        )}
                                    </View>
                                    <Text
                                        style={[
                                            styles.radioLabel,
                                            value === option.value &&
                                                styles.radioLabelSelected,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {error && (
                        <Text style={styles.errorText}>
                            {error.message || "This field is required"}
                        </Text>
                    )}
                </View>
            )}
        />
    );
};

export default RadioButtonInput;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    radioGroup: {
        width: "100%",
        gap: 10,
    },
    radioButton: {
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2196F3",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    radioButtonSelected: {
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
    },
    radioButtonInner: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    radioCircleSelected: {
        borderColor: "#4CAF50",
    },
    radioCircleDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#4CAF50",
    },
    radioLabel: {
        marginLeft: 10,
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.8)",
    },
    radioLabelSelected: {
        color: "white",
        fontWeight: "500",
    },
    errorContainer: {
        borderColor: "#FFC107",
    },
    errorText: {
        color: "#FFC107",
        fontSize: 12,
        marginTop: 4,
    },
});
