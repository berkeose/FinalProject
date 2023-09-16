import { StyleSheet, Text, View,ImageBackground } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native-web'


const Pedometer = () => {
  return (
    <View style={styles.container}>
        <ImageBackground
        style={{flex:1}}
        resizeMode='cover'
        source={require('../images/run.jpg')}>
    <View style = {{flex:1,justifyContent:"center"}}>

      <Text style={styles.headingDesign}>Pedometer is avaible on device</Text>
    </View>
    </ImageBackground>
    <StatusBar style="auto"/>
    </View>
  )
}

export default Pedometer

const styles = StyleSheet.create({})