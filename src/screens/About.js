import React from "react";

import { Text, View } from "react-native";

import MyTabs from "../navigation/TabNavigator";

const About = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>About</Text>
        </View>
    );
}

export default About;