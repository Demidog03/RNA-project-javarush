import {Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Image} from "expo-image";


export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>Hello</Text>

            <View style={styles.section1}>
                <Text>Section 1</Text>
                <Image
                    source={require('@/assets/images/android-icon-foreground.png')}
                    style={styles.image1}
                />
            </View>

            <View style={styles.section2}>
                <Text>Section 2</Text>
                <TextInput style={styles.input1} placeholder="Введите текст здесь..."></TextInput>
            </View>

            <Button title="Click me" />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    content: {
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 32,
    },
    section1: {
        height: 400,
        backgroundColor: '#cccccc',
        marginBottom: 20,
        padding: 20,
        borderRadius: 10
    },
    section2: {
        height: 200,
        backgroundColor: '#cc8c8c',
        padding: 20,
        borderRadius: 10
    },
    image1: {
        width: '100%',
        height: 300
    },
    input1: {
        width: '100%',
        padding: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5
    }
});
