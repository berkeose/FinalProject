import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DataCont = () => {
  return (
      <View style={styles.cont}  >
      <Text>DataCont</Text>
    </View>
  )
}

export default DataCont

const styles = StyleSheet.create({
    cont:{
        borderWidth:1,
        flex:1,
    },
})