import React from 'react';
import { TextInput, StyleSheet, View, } from 'react-native';

import Color from '../Styles/colors';
import { Entypo } from '@expo/vector-icons';
const NewTextInput = ({ value, onChangeText, iconName, Name, lock = false }) => {
    return (
        <View style={styles.container}>
            <Entypo name={iconName} size={30} style={styles.icon} color={Color.dark} />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                placeholder={Name}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={lock}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.4,
        borderColor: Color.acc1,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        margin: 20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        padding: 10,
        fontSize: 18,
        fontWeight: "500",
        color: Color.acc1,

    }
});

export default NewTextInput;