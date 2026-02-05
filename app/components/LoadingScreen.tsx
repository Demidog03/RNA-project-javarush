import {ActivityIndicator, StyleSheet, Text, View} from "react-native";

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#6200ee" />
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    },
    text: {
        marginTop: 12,
        fontSize: 16,
        color: "#666"
    }
})