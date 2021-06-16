import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';

const FloatingButton = () => {
    return (
        <View style={styles.container}>
            <Text>Button</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent:'center',
        // alignItems:'center'
    },
})

export default FloatingButton;