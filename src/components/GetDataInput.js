import React from 'react';
import { TextInput, StyleSheet, View, } from 'react-native';

import Color from '../Styles/colors';
import { Entypo } from '@expo/vector-icons';

const GetDataInput = ({ onChangeText, Name }) => {
    return (

        <TextInput
            style={styles.input}

            onChangeText={onChangeText}
            placeholder={Name}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}

        />


    );
};

const styles = StyleSheet.create({
    input: {
        flex: .04,
        padding: 10,
        fontSize: 17,
        fontWeight: "500",
        borderWidth:1,
        margin:15
    }
});




export default GetDataInput