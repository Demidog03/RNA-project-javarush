import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {loginThunk} from "@/app/store/thunks/authThunks";
import {
    useNavigation,
} from '@react-navigation/native';

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.auth);
    const { navigate } = useNavigation();

    useEffect(() => {
        console.log(token)
    }, [token])

    async function handleSubmitLogin() {
        try {
            if (email && password) {
                dispatch(loginThunk({
                    email,
                    password
                }))

                navigate('Todos' as never)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Login</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                    placeholderTextColor="#999"
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmitLogin}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 700,
        textAlign: 'center',
        color: '#6200ee'
    },
    inputContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        gap: 20,
        paddingBottom: 20,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    submitButton: {
        backgroundColor: '#6200ee',
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingVertical: 16,
        justifyContent: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
})