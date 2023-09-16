import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Color from '../Styles/colors'


const SubmitBtn = ({title, onPress}) => {
    return (
        <TouchableOpacity
            onPress={onPress} 
            style={styles.container} >
            <Text style={styles.txt} >{title}</Text>
        </TouchableOpacity>
    )
}

export default SubmitBtn

const styles = StyleSheet.create({
    container: {
        flex: .2,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.main,
        margin:18,
        padding:10,
        borderRadius:10
    },
    txt:{
        fontSize:22,
        color:"white",

    }
})