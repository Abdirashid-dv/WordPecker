import { StyleSheet, Text, TextInput as RNTextInput, View } from "react-native";
import { Control, Controller } from "react-hook-form";

interface TextInputProps {
    control: Control<any>;
    name: string;
    placeholder?: string;
    label?: string;
    required?: boolean;
    secureTextEntry?: boolean;
    customStyles?: object;
}

const TextInput = ({
    control,
    name,
    placeholder,
    label,
    required,
    secureTextEntry,
    customStyles,
}: TextInputProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: required }}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
            }) => (
                <View style={styles.container}>
                    <RNTextInput
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={[
                            styles.input,
                            customStyles,
                            error && styles.errorInput,
                        ]}
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    />
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

export default TextInput;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    input: {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 12,
        padding: 16,
        color: "white",
        fontSize: 16,
    },
    errorInput: {
        borderColor: "#FFC107",
    },
    errorText: {
        color: "#FFC107",
        fontSize: 12,
        marginTop: 4,
    },
});
