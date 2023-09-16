import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import Color from '../Styles/colors';
const Secim = ({ icoName = "arrow-up", title = "Kilo Ver", onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.cont}>
            <FontAwesome name={icoName} size={34} color="black" />
            <Text
                style={styles.headerTxt}>
            {title}</Text>
        </TouchableOpacity>
    )
}

export default Secim

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        margin: 12,
        backgroundColor:`#7fffd4`,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:10
    },
    headerTxt:{
        fontSize:17,
        textAlign: "center",
        fontWeight: "700",
        letterSpacing:1
    }
})