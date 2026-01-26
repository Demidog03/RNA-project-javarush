import React from 'react';
import {Button, Text, View} from "react-native";
import {useLinkTo} from "@react-navigation/native";

function HomeScreen() {
    const linkTo = useLinkTo()

    return (
        <View>
            <Text>Home screen</Text>
            <Button title="Go to Details screen" onPress={() => {
                linkTo('/Details')
            }} />
        </View>
    );
}

export default HomeScreen;